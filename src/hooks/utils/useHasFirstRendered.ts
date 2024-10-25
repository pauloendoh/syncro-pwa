import { useEffect, useState } from 'react'

export const useHasFirstRendered = () => {
  const [hasFirstRendered, setHasFirstRendered] = useState(false)

  useEffect(() => {
    setHasFirstRendered(true)
  }, [])

  return hasFirstRendered
}
