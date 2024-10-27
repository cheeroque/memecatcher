import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  dialect: 'sqlite',
  schema: './app/drizzle/schema.server.ts',
  out: './app/drizzle/migrations',
})
