/* Converts numeric values to CSS pixel values (24 -> `24px`),
 * returns non-numeric values as is */
export function getCssUnit(value?: number | string) {
  if (value === undefined) return
  if ([0, '0'].includes(value)) return 0
  if (!isNaN(Number(value))) return `${value}px`
  return value
}
