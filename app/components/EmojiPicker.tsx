import type { Emotion } from '~/types'

export function EmojiPicker(props: {
  emotions: Array<Emotion>
  onEmotionClick: (event: string) => void
}) {
  const { emotions, onEmotionClick } = props

  return (
    <div className="flex flex-wrap gap-3">
      {emotions.map(({ id, emoji }) => (
        <button
          key={id}
          className="flex justify-center items-center p-3 leading-tight rounded bg-slate-100 hover:bg-cyan-500 transition-colors"
          onClick={() => onEmotionClick(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}
