import { useMemo, useState } from 'react'
import { usePlannedItemsQueryV2 } from '../../../../hooks/react-query/interest/usePlannedItemsQueryV2'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import {
  ratingStatusArray,
  RatingStatusType,
} from '../../../../types/domain/rating/ratingStatusArray'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { capitalize } from '../../../../utils/text/capitalize'

export const usePlannedSectionUtils = (props: { userId: string }) => {
  const [selectedType, setSelectedType] = useState<SyncroItemType>()
  const [selectedStatus, setSelectedStatus] =
    useState<RatingStatusType>('PLANNED')

  const { data: ratings } = usePlannedItemsQueryV2(props.userId, selectedStatus)

  const { data: userInfo } = useUserInfoQuery(props.userId)

  const { authUser } = useAuthStore()

  const isMyPlannedItems = useMemo(
    () => props.userId === authUser?.id,
    [props.userId, authUser?.id]
  )

  const title = useMemo(() => {
    const statusLabel = ratingStatusArray.find(
      (status) => status.value === selectedStatus
    )?.simpleLabel

    if (isMyPlannedItems) return `My ${statusLabel} items`

    if (!userInfo?.username) return `${capitalize(statusLabel!)} items`

    return `${userInfo.username}'s ${statusLabel} items`
  }, [userInfo?.username, authUser?.username, isMyPlannedItems, selectedStatus])

  return {
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    ratings,
    userInfo,
    isMyPlannedItems,
    title,
  }
}
