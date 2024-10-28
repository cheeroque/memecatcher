export function Input(props: {
  autoComplete?: string
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  type?: string
  value?: string
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const { type } = props

  return (
    <input
      {...props}
      type={type ?? 'text'}
      className={`w-full py-2 px-3 rounded-md border focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200`}
    />
  )
}
