import { useMemo } from 'react'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { useUserSimilarityQuery } from './useUserSimilarityQuery'

export const useUserHighSimilarityTypesQueryUtils = (userId: string) => {
  const { data, isLoading } = useUserSimilarityQuery(userId)

  const highSimilarityTypes = useMemo(() => {
    if (!data) return []
    const result = syncroItemTypes.reduce<SyncroItemType[]>((acc, type) => {
      const similarity = data.typeSimilarity.find((x) => x.itemType === type)
      if (!similarity) return acc

      if (
        similarity.similarityInfo.overallPercentage > 0.5 &&
        similarity.similarityInfo.ratedSameItemsCount >= 10
      ) {
        acc.push(type)
      }

      return acc
    }, [])

    return result
  }, [data])

  return highSimilarityTypes
}
