export function Icon(props: { children: React.ReactElement; size?: number | string }) {
  const { children, size } = props

  return (
    <span
      className="inline-flex flex-none"
      style={size ? { width: size, height: size } : undefined}
    >
      {children}
    </span>
  )
}
