import { getCssUnit } from '~/utils'

export function Spinner(props: { size?: string | number }) {
  const cssSize = getCssUnit(props.size) ?? '1em'

  return (
    <div role="status" className="flex-inline" style={{ width: cssSize, height: cssSize }}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-spin"
      >
        <path
          d="m12 23c-6.0752 0-11-4.9248-11-11-7e-8 -6.0752 4.9248-11 11-11 6.0752 2e-7 11 4.9248 11 11"
          fill="none"
          strokeLinecap="round"
          strokeWidth="2"
          className="stroke-current"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
