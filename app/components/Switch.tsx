export function Switch(props: {
  checked?: boolean
  children?: React.ReactNode
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const { checked, children, value, onChange } = props

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        checked={checked}
        value={value}
        type="checkbox"
        className="sr-only peer"
        onChange={onChange}
      />

      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline peer-focus:outline-2 peer-focus:outline-cyan-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-700" />

      <span className="ms-2 text-sm font-medium text-gray-900">
        {children}
      </span>
    </label>
  )
}
