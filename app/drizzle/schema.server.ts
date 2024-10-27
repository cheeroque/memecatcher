import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const timestamps = {
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}

export const stickersTable = sqliteTable('stickers', {
  id: integer('id').primaryKey(),
  image: text('image').notNull(),
  ...timestamps,
})

export const emotionsTable = sqliteTable('emotions', {
  id: integer('id').primaryKey(),
  emoji: text('emoji').notNull(),
  alias: text('alias').default(''),
  ...timestamps,
})

export const stickersToEmotionsTable = sqliteTable('stickers_emotions', {
  stickerId: integer('sticker_id')
    .notNull()
    .references(() => stickersTable.id, { onDelete: 'cascade' }),
  emotionId: integer('emotion_id')
    .notNull()
    .references(() => emotionsTable.id, { onDelete: 'cascade' }),
})

export const stickerRelations = relations(stickersTable, ({ many }) => ({
  emotions: many(stickersToEmotionsTable),
}))

export const emotionRelations = relations(emotionsTable, ({ many }) => ({
  stickers: many(stickersToEmotionsTable),
}))

export const stickersToEmotionsRelations = relations(stickersToEmotionsTable, ({ one }) => ({
  sticker: one(stickersTable, {
    fields: [stickersToEmotionsTable.stickerId],
    references: [stickersTable.id],
  }),
  emotion: one(emotionsTable, {
    fields: [stickersToEmotionsTable.emotionId],
    references: [emotionsTable.id],
  }),
}))
