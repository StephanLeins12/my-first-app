/**
 * Supabase Database type for the project.
 * Extend this when adding new tables; or regenerate with:
 * pnpm supabase gen types typescript --project-id <ref> > types/supabase.ts
 */
import type { Profil, ProfilInsert, ProfilUpdate } from './profil'

export interface Database {
  public: {
    Tables: {
      profil: {
        Row: Profil
        Insert: ProfilInsert
        Update: ProfilUpdate
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
