# Supabase MCP Server

This directory contains the Model Context Protocol (MCP) server for Supabase integration.

## Quick Start

1. Install dependencies (required — root `pnpm install` does not install this package’s deps):
   ```bash
   pnpm install
   ```
   On a fresh clone, run this from `mcp-server` before using `pnpm run check` or the MCP server from Cursor.

2. Set environment variables (or ensure they're in parent `.env.local`):
   ```bash
   export NEXT_PUBLIC_SUPABASE_URL=your_url
   export NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key
   ```

3. Run the server:
   ```bash
   pnpm start
   ```

## Checking the database connection

From the **project root** (`my-first-app`):

```bash
pnpm run check-db
```

This script runs `tsx check-connection.ts` in this directory and verifies Supabase URL and auth. Ensure dependencies are installed here first (step 1).

## Development

For development with auto-reload:

```bash
pnpm dev
```

## Building

To compile TypeScript:

```bash
pnpm build
```

## Integration with Cursor

The MCP server is configured in `.cursor/mcp.json` at the project root. Cursor will automatically start this server when needed.

## Architecture

- `supabase-mcp.ts` - Main MCP server implementation
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration

The server exposes Supabase operations as MCP tools, allowing AI assistants to interact with your database through the Model Context Protocol.
