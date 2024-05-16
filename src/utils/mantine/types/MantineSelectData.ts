export type MantineSelectData<T> = {
  value: T
  label: string
  selected?: boolean
  disabled?: boolean
  group?: string
  [key: string]: any
}[]
