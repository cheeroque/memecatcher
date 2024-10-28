import { Sticker } from '~/components/Sticker'

import type { StickerWithEmotions } from '~/types'

export function StickerPicker(props: { stickers: Array<StickerWithEmotions> }) {
  const { stickers } = props

  return stickers.length ? (
    <div className="flex flex-wrap gap-5">
      {stickers.map((sticker) => (
        <Sticker key={sticker.id} sticker={sticker} />
      ))}
    </div>
  ) : (
    <p className="text-gray-500">Nothing found.</p>
  )
}
