#!/usr/bin/env node
/**
 * MCP Server for Supabase Integration
 * 
 * This MCP server exposes Supabase functionality as MCP tools and resources.
 * It allows AI assistants to interact with your Supabase database through
 * the Model Context Protocol.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

interface SupabaseMCPConfig {
  supabaseUrl: string
  supabaseKey: string
}

function requireEnv(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

class SupabaseMCPServer {
  private server: Server
  private supabaseUrl: string
  private supabaseKey: string

  constructor(config: SupabaseMCPConfig) {
    this.supabaseUrl = config.supabaseUrl
    this.supabaseKey = config.supabaseKey

    this.server = new Server(
      {
        name: 'supabase-mcp',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    )

    this.setupHandlers()
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'query_table',
            description: 'Query data from a Supabase table',
            inputSchema: {
              type: 'object',
              properties: {
                table: {
                  type: 'string',
                  description: 'The name of the table to query',
                },
                select: {
                  type: 'string',
                  description: 'Columns to select (comma-separated, or "*" for all)',
                  default: '*',
                },
                filter: {
                  type: 'object',
                  description: 'Optional filter conditions',
                },
                limit: {
                  type: 'number',
                  description: 'Maximum number of rows to return',
                  default: 100,
                },
              },
              required: ['table'],
            },
          },
          {
            name: 'insert_row',
            description: 'Insert a new row into a Supabase table',
            inputSchema: {
              type: 'object',
              properties: {
                table: {
                  type: 'string',
                  description: 'The name of the table',
                },
                data: {
                  type: 'object',
                  description: 'The data to insert',
                },
              },
              required: ['table', 'data'],
            },
          },
          {
            name: 'update_row',
            description: 'Update rows in a Supabase table',
            inputSchema: {
              type: 'object',
              properties: {
                table: {
                  type: 'string',
                  description: 'The name of the table',
                },
                filter: {
                  type: 'object',
                  description: 'Filter conditions to identify rows to update',
                },
                data: {
                  type: 'object',
                  description: 'The data to update',
                },
              },
              required: ['table', 'filter', 'data'],
            },
          },
          {
            name: 'delete_row',
            description: 'Delete rows from a Supabase table',
            inputSchema: {
              type: 'object',
              properties: {
                table: {
                  type: 'string',
                  description: 'The name of the table',
                },
                filter: {
                  type: 'object',
                  description: 'Filter conditions to identify rows to delete',
                },
              },
              required: ['table', 'filter'],
            },
          },
        ],
      }
    })

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params

      try {
        // Create Supabase client directly for MCP server context
        const supabase = createSupabaseClient(
          this.supabaseUrl,
          this.supabaseKey
        )

        switch (name) {
          case 'query_table': {
            const { table, select = '*', filter, limit = 100 } = args as {
              table: string
              select?: string
              filter?: Record<string, unknown>
              limit?: number
            }

            let query = supabase.from(table).select(select).limit(limit)

            if (filter) {
              Object.entries(filter).forEach(([key, value]) => {
                query = query.eq(key, value)
              })
            }

            const { data, error } = await query

            if (error) throw error

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(data, null, 2),
                },
              ],
            }
          }

          case 'insert_row': {
            const { table, data } = args as {
              table: string
              data: Record<string, unknown>
            }

            const { data: insertedData, error } = await supabase
              .from(table)
              .insert(data)
              .select()

            if (error) throw error

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(insertedData, null, 2),
                },
              ],
            }
          }

          case 'update_row': {
            const { table, filter, data } = args as {
              table: string
              filter: Record<string, unknown>
              data: Record<string, unknown>
            }

            let query = supabase.from(table).update(data)

            Object.entries(filter).forEach(([key, value]) => {
              query = query.eq(key, value)
            })

            const { data: updatedData, error } = await query.select()

            if (error) throw error

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(updatedData, null, 2),
                },
              ],
            }
          }

          case 'delete_row': {
            const { table, filter } = args as {
              table: string
              filter: Record<string, unknown>
            }

            let query = supabase.from(table).delete()

            Object.entries(filter).forEach(([key, value]) => {
              query = query.eq(key, value)
            })

            const { data: deletedData, error } = await query.select()

            if (error) throw error

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(deletedData, null, 2),
                },
              ],
            }
          }

          default:
            throw new Error(`Unknown tool: ${name}`)
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    })

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'supabase://tables',
            name: 'Supabase Tables',
            description: 'List of all tables in the Supabase database',
            mimeType: 'application/json',
          },
          {
            uri: 'supabase://schema',
            name: 'Database Schema',
            description: 'The database schema information',
            mimeType: 'application/json',
          },
        ],
      }
    })

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params

      try {
        if (uri === 'supabase://tables') {
          // Note: This is a simplified example. In production, you'd query
          // the information_schema or use Supabase's metadata API
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(
                  { message: 'Table listing requires database introspection' },
                  null,
                  2
                ),
              },
            ],
          }
        }

        if (uri === 'supabase://schema') {
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(
                  { message: 'Schema information requires database introspection' },
                  null,
                  2
                ),
              },
            ],
          }
        }

        throw new Error(`Unknown resource: ${uri}`)
      } catch (error) {
        return {
          contents: [
            {
              uri,
              mimeType: 'text/plain',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        }
      }
    })
  }

  async run() {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
    console.error('Supabase MCP server running on stdio')
  }
}

// Initialize and run the server
const server = new SupabaseMCPServer({
  // Prefer server-side env vars (no NEXT_PUBLIC) for MCP process
  supabaseUrl: requireEnv(
    'SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL fallback)',
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  ),
  supabaseKey: requireEnv(
    'SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY fallback)',
    process.env.SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  ),
})

server.run().catch(console.error)
