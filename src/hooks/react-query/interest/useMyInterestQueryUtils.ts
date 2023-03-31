import { useMemo } from 'react'
import { useMyInterestsQuery } from './useMyInterestsQuery'

export const useMyInterestQueryUtils = (itemId: string) => {
  const { data: myInterests } = useMyInterestsQuery()

  const myInterest = useMemo(
    () => myInterests?.find((r) => r.syncroItemId === itemId) || null,
    [myInterests, itemId]
  )

  return myInterest
}
