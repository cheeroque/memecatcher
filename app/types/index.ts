import { emotionsTable, stickersTable } from '~/drizzle/schema.server'
import type { InferSelectModel } from 'drizzle-orm'

export type Emotion = InferSelectModel<typeof emotionsTable>
export type Sticker = InferSelectModel<typeof stickersTable>
export type StickerWithEmotions = Sticker & {
  emotions?: { emotion: Emotion }[]
}
