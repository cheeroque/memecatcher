import { json, useLoaderData, useNavigation, useSubmit } from '@remix-run/react'
import { eq, getTableColumns, or, sql } from 'drizzle-orm'
import { useState } from 'react'

import { db } from '~/drizzle/config.server'
import { emotionsTable, stickersTable, stickersToEmotionsTable } from '~/drizzle/schema.server'
import { SearchForm } from '~/components/SearchForm'
import { StickerPicker } from '~/components/StickerPicker'
import { Switch } from '~/components/Switch'

import type { LoaderFunctionArgs } from '@remix-run/node'
import type { Emotion, StickerWithEmotions } from '~/types'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')

  const emotions = db.select().from(emotionsTable).all()
  let stickers: Array<StickerWithEmotions> = []

  if (q) {
    /* If search query is set, filter stickers by emotion alias and emoji */
    const filter = `%${q.toLowerCase()}%`

    /* Get a subquery with filtered emotions */
    const subQuery = db
      .select({
        ...getTableColumns(emotionsTable),
        stickerId: stickersToEmotionsTable.stickerId,
      })
      .from(stickersToEmotionsTable)
      .leftJoin(emotionsTable, eq(stickersToEmotionsTable.emotionId, emotionsTable.id))
      .where(
        or(sql.raw(`lower(alias) like '${filter}'`), sql.raw(`lower(emoji) like '${filter}'`))
      )
      .as('subQuery')

    /* Join stickers with filtered emotions */
    const filteredStickers = await db
      .select({
        ...getTableColumns(stickersTable),
        emotions: sql`json_group_array(
          json_object(
            'id',${subQuery.id},
            'emoji',${subQuery.emoji},
            'alias',${subQuery.alias}
          )
        )`.mapWith({
          /* Parse JSON to array of `Emotion`s */
          mapFromDriverValue: (value: string): Array<Emotion> => JSON.parse(value),
        }),
      })
      .from(stickersTable)
      .innerJoin(subQuery, eq(stickersTable.id, subQuery.stickerId))
      .groupBy(stickersTable.id)

    stickers = filteredStickers.map(({ id, image, createdAt, updatedAt, emotions }) => ({
      id,
      image,
      createdAt,
      updatedAt,
      emotions: emotions.map((emotion) => ({
        stickerId: id,
        emotionId: emotion.id,
        emotion,
      })),
    }))
  } else {
    /* If search query is empty, return all stickers with related emotions */
    stickers = await db.query.stickersTable.findMany({
      with: {
        emotions: {
          with: {
            emotion: true,
          },
        },
      },
    })
  }

  return json({ emotions, q, stickers })
}

export default function Index() {
  const { emotions, q, stickers } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const submit = useSubmit()

  const [isEdit, setIsEdit] = useState(false)

  const isLoading =
    navigation.location && new URLSearchParams(navigation.location.search).has('q')

  function handleFormChange(event: React.ChangeEvent<HTMLFormElement>) {
    const isFirstSearch = q === null
    submit(event.currentTarget, { replace: !isFirstSearch })
  }

  function handleSwitchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsEdit(event.target.checked)
  }

  return (
    <div className="px-6 py-8">
      <div className="flex gap-6 mb-6">
        <SearchForm
          emotions={emotions}
          isLoading={isLoading}
          q={q ?? undefined}
          onChange={handleFormChange}
        />

        <div
          className={`${isEdit ? 'border-cyan-300 bg-cyan-100 ' : ''}flex justify-center items-center px-3 py-2 rounded-md border`}
        >
          <Switch checked={isEdit} onChange={handleSwitchChange}>
            <span className="whitespace-nowrap">Edit mode</span>
          </Switch>
        </div>
      </div>

      <StickerPicker stickers={stickers} />
    </div>
  )
}
