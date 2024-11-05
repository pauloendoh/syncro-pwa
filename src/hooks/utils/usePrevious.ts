import { useEffect, useRef } from 'react'

// https://stackoverflow.com/a/53446665
export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
