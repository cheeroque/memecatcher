import { useEffect, useState } from 'react'
import IconClipboard from '~/components/IconClipboard'
import type { StickerWithEmotions } from '~/types'

export default function Sticker({ sticker }: { sticker: StickerWithEmotions }) {
  const { emotions, image } = sticker
  const emojis = emotions?.map(({ emotion }) => emotion.emoji) ?? []
  const imagePath = `/storage/stickers/${image}`

  const [copied, setCopied] = useState(false)

  /* After image was copied, set `copied` back to `false` after delay */
  useEffect(() => {
    if (!copied) return
    const timeoutId = setTimeout(() => setCopied(false), 5000)
    return () => clearTimeout(timeoutId)
  }, [copied])

  /* clipboard.write supports only PNG images, so we create a canvas element,
   * load image into it, convert it to PNG blob, and then copy to clipboard */
  async function handleClick() {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      if (!ctx) {
        return
      }

      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.drawImage(img, 0, 0)

      canvas.toBlob((blob) => {
        if (!blob) {
          return
        }

        navigator.clipboard
          .write([new ClipboardItem({ 'image/png': blob })])
          .then(() => {
            /* Update copied state to show success message */
            setCopied(true)

            canvas.remove()
            img.remove()
          })
          .catch((error) => console.log(error.message))
      }, 'image/png')
    }

    img.src = imagePath
  }

  return (
    <button
      className="group relative w-[15rem] h-[15rem] rounded-lg overflow-hidden"
      type="button"
      onClick={() => handleClick()}
    >
      <img alt={emojis.join(' ')} className="w-full h-full object-cover" src={imagePath} />

      <span className="absolute inset-0 flex justify-center items-center font-medium text-white bg-cyan-800 opacity-0 group-hover:opacity-75 transition-opacity z-20">
        {copied ? 'Image copied!' : <IconClipboard size="2rem" />}
      </span>

      <span className="absolute inset-x-0 bottom-0 py-1 px-2 bg-white bg-opacity-50 z-10">
        {emojis.join(' ')}
      </span>
    </button>
  )
}
