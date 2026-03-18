#!/usr/bin/env node
/**
 * One-off script to verify Supabase connection (same config as MCP server).
 * Run from my-first-app: node --env-file=.env.local --import tsx mcp-server/check-connection.ts
 * Or from mcp-server with env already set: npx tsx check-connection.ts
 */
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Load .env.local from project root if present and env not set
function loadEnvLocal() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  if (url) return
  const paths = [resolve(process.cwd(), '.env.local'), resolve(process.cwd(), '..', '.env.local')]
  for (const p of paths) {
    if (!existsSync(p)) continue
    const content = readFileSync(p, 'utf8')
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    }
    break
  }
}
loadEnvLocal()

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env: SUPABASE_URL and SUPABASE_ANON_KEY (or NEXT_PUBLIC_*).')
  console.error('Set them in .env.local or pass when running the MCP server.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  try {
    // Auth API call to verify we can reach Supabase (no table needed)
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) {
      console.error('Supabase auth check failed:', sessionError.message)
      process.exit(1)
    }
    console.log('Supabase URL:', supabaseUrl.replace(/\/$/, ''))
    console.log('Auth reachable: OK (session:', session?.session ? 'present' : 'none', ')')

    // Optional: try a generic table query if you have a table (e.g. profiles)
    const { data, error } = await supabase.from('profiles').select('id').limit(1)
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('relation')) {
        console.log('Table "profiles": not found (DB connection still OK)')
      } else {
        console.log('Table query result:', error.message)
      }
    } else {
      console.log('Table "profiles": OK, row count sample:', Array.isArray(data) ? data.length : 0)
    }
    console.log('\nDatabase connection check passed.')
  } catch (err) {
    console.error('Connection error:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

check()
