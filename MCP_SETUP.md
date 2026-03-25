# MCP Integration with Supabase

This project includes Model Context Protocol (MCP) integration for Supabase, allowing AI assistants to interact with your Supabase database.

## Setup

### 1. Install MCP Server Dependencies

Navigate to the `mcp-server` directory and install dependencies:

```bash
cd mcp-server
pnpm install
```

This will install:
- `@modelcontextprotocol/sdk` - The MCP SDK
- `@supabase/supabase-js` - Supabase client library
- `tsx` - TypeScript execution (dev dependency)
- `@types/node` - Node.js type definitions (dev dependency)

> **Important:** The root project uses a pnpm workspace and does **not** install `mcp-server` dependencies. You must run `pnpm install` inside `mcp-server` (or `pnpm install --ignore-workspace` from the `mcp-server` folder) so that `node_modules` exists there. Otherwise `pnpm run check-db` and the MCP server will fail with "tsx not found".

### 3. Configure Cursor

The MCP server is configured in `.cursor/mcp.json`. Make sure your environment variables are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_key
```

### 4. Verify Configuration

**Check database connection** from the project root:

```bash
pnpm run check-db
```

This runs the connection check script in `mcp-server` (requires `mcp-server` dependencies to be installed; see step 1).

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_key
```

The MCP server will read these environment variables automatically.

### 5. Alternative: Standalone MCP Server

If you prefer to run the MCP server standalone (not through Cursor), you can:

```bash
cd mcp-server
NEXT_PUBLIC_SUPABASE_URL=your_url \
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key \
pnpm start
```

## Available MCP Tools

The Supabase MCP server exposes the following tools:

### `query_table`
Query data from a Supabase table.

**Parameters:**
- `table` (required): The name of the table to query
- `select` (optional): Columns to select (default: "*")
- `filter` (optional): Filter conditions as an object
- `limit` (optional): Maximum number of rows (default: 100)

**Example:**
```json
{
  "table": "users",
  "select": "id, email, name",
  "filter": { "active": true },
  "limit": 10
}
```

### `insert_row`
Insert a new row into a Supabase table.

**Parameters:**
- `table` (required): The name of the table
- `data` (required): The data to insert

**Example:**
```json
{
  "table": "users",
  "data": {
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### `update_row`
Update rows in a Supabase table.

**Parameters:**
- `table` (required): The name of the table
- `filter` (required): Filter conditions to identify rows
- `data` (required): The data to update

**Example:**
```json
{
  "table": "users",
  "filter": { "id": 1 },
  "data": { "name": "Jane Doe" }
}
```

### `delete_row`
Delete rows from a Supabase table.

**Parameters:**
- `table` (required): The name of the table
- `filter` (required): Filter conditions to identify rows

**Example:**
```json
{
  "table": "users",
  "filter": { "id": 1 }
}
```

## Available MCP Resources

### `supabase://tables`
Lists all tables in the Supabase database.

### `supabase://schema`
Provides database schema information.

## Security Considerations

⚠️ **Important Security Notes:**

1. **Row Level Security (RLS)**: Ensure RLS is enabled on your Supabase tables. The MCP server uses your publishable key, which respects RLS policies.

2. **Environment Variables**: Never commit `.env.local` to version control. The MCP server reads credentials from environment variables.

3. **Access Control**: The MCP server uses the Supabase client configured in `lib/supabase/server.ts`, which respects authentication cookies and RLS policies.

4. **Production Use**: For production, consider:
   - Using service role keys only in secure server environments
   - Implementing additional authentication/authorization layers
   - Limiting which tables/operations are exposed via MCP

## Development

To test the MCP server locally:

```bash
cd mcp-server
NEXT_PUBLIC_SUPABASE_URL=your_url \
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key \
pnpm start
```

## Next Steps

1. Generate TypeScript types from your Supabase schema:
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/types/supabase.ts
   ```

2. Customize the MCP server tools to match your specific use cases

3. Add additional tools for:
   - Stored procedures/functions
   - Real-time subscriptions
   - File storage operations
   - Authentication operations

## References

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase TypeScript Client](https://supabase.com/docs/reference/javascript/introduction)
