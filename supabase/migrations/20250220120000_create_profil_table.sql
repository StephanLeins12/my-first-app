-- Migration: Create profil table for extended user data
-- Purpose: Store first name, profile picture url, and email linked to auth.users.
-- Trigger: Automatically create a profil row when a new user signs up.
-- RLS: Authenticated users can only read/update/delete their own row.

-- =============================================================================
-- Table: public.profil
-- =============================================================================
create table public.profil (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  profile_picture_url text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profil is 'Extended user profile data linked to auth.users. One row per user, created by trigger on signup.';

-- Index on id is implicit (primary key). RLS policies filter by id = auth.uid(), so no extra index needed.

-- =============================================================================
-- Trigger function: create profil row on new user signup
-- =============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profil (id, email, first_name, profile_picture_url, created_at, updated_at)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'first_name',
      new.raw_user_meta_data->>'given_name'
    ),
    new.raw_user_meta_data->>'profile_picture_url',
    now(),
    now()
  );
  return new;
end;
$$;

comment on function public.handle_new_user() is 'Creates a public.profil row when a new user is inserted into auth.users.';

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =============================================================================
-- Optional: keep updated_at in sync on update
-- =============================================================================
create or replace function public.handle_profil_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profil_updated_at
  before update on public.profil
  for each row
  execute function public.handle_profil_updated_at();

-- =============================================================================
-- Row Level Security (RLS)
-- =============================================================================
alter table public.profil enable row level security;

-- Authenticated: select own row only
create policy "Users can select own profil"
  on public.profil
  for select
  to authenticated
  using ( (select auth.uid()) = id );

-- Authenticated: insert only for own id (trigger does the initial insert; this allows no client inserts or only self-insert)
create policy "Users can insert own profil"
  on public.profil
  for insert
  to authenticated
  with check ( (select auth.uid()) = id );

-- Authenticated: update own row only
create policy "Users can update own profil"
  on public.profil
  for update
  to authenticated
  using ( (select auth.uid()) = id )
  with check ( (select auth.uid()) = id );

-- Authenticated: delete own row only
create policy "Users can delete own profil"
  on public.profil
  for delete
  to authenticated
  using ( (select auth.uid()) = id );
