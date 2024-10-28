import { Form } from '@remix-run/react'
import { useState } from 'react'

import { EmojiPicker } from '~/components/EmojiPicker'
import { Input } from '~/components/Input'
import { Spinner } from '~/components/Spinner'

import type { Emotion } from '~/types'

export function SearchForm(props: {
  emotions?: Array<Emotion>
  isLoading?: boolean
  q?: string
  onChange?: (event: React.ChangeEvent<HTMLFormElement>) => void
}) {
  const { emotions, isLoading, q, onChange } = props

  const [filter, setFilter] = useState(q)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Close menu on click outside form */
  function handleDocumentClick(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement)) return

    const form = event.target.closest('#search-form')
    if (!form) {
      setMenuOpen(false)
      document.removeEventListener('click', handleDocumentClick)
    }
  }

  /* Append selected emoji to current filter */
  function handleEmotionClick(event: string) {
    setFilter((filter ?? '') + event)
  }

  /* Open menu on input focus */
  function handleFocus() {
    setMenuOpen(true)
    document.addEventListener('click', handleDocumentClick)
  }

  return (
    <Form id="search-form" role="search" className="relative" onChange={onChange}>
      <div className="relative">
        <Input
          id="search"
          autoComplete="off"
          name="q"
          placeholder="Enter emoji or keyword to search"
          type="search"
          value={filter}
          onFocus={handleFocus}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(event.currentTarget.value)
          }
        />

        {isLoading && (
          <span className="absolute top-[50%] right-3 translate-y-[-50%] text-slate-300">
            <Spinner />
          </span>
        )}
      </div>

      <div
        className={`${!menuOpen ? 'hidden ' : ''}absolute w-full rounded-md bg-white shadow-md mt-1 p-4 z-50`}
      >
        <EmojiPicker emotions={emotions ?? []} onEmotionClick={handleEmotionClick} />
      </div>
    </Form>
  )
}
