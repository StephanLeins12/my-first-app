/**
 * Types for the public.profil table (extended user profile data).
 * One row per auth.users entry, created by trigger on signup.
 */

export interface Profil {
  id: string
  first_name: string | null
  profile_picture_url: string | null
  email: string | null
  created_at: string
  updated_at: string
}

export interface ProfilInsert {
  id: string
  first_name?: string | null
  profile_picture_url?: string | null
  email?: string | null
  created_at?: string
  updated_at?: string
}

export interface ProfilUpdate {
  first_name?: string | null
  profile_picture_url?: string | null
  email?: string | null
  updated_at?: string
}
