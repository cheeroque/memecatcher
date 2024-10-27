import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import DB from 'better-sqlite3'

import * as schema from './schema.server'

if (!process.env.DATABASE_URL) {
  throw new Error('Missing env variable: DATABASE_URL')
}

export const db = drizzle(new DB(process.env.DATABASE_URL), { schema })

void migrate(db, { migrationsFolder: 'app/drizzle/migrations' })
