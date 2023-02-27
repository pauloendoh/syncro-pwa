import { Box, Text, useMantineTheme } from '@mantine/core'
import { useEffect, useMemo } from 'react'
import { useUserItemsQuery } from '../../../hooks/react-query/user/useUserItemsQuery'
import { syncroItemMapping } from '../../../types/domain/syncro-item/SyncroItemType/syncroItemMapping'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'
import { useSortedItems } from './useSortedItems/useSortedItems'

interface Props {
  userId: string
  // onClick: () => void
  itemType: SyncroItemType
  refreshedAt: string
}

const ProfileScreenRatingItem = (props: Props) => {
  const {
    data: userItems,
    refetch: refetchUserRatings,
    isLoading: isLoadingUserRatings,
  } = useUserItemsQuery(props.userId, props.itemType)

  useEffect(() => {
    refetchUserRatings()
  }, [props.refreshedAt])

  const sortedItems = useSortedItems({
    items: userItems,
    sortingBy: 'theirRatingDesc',
  })

  const firstItem = useMemo(() => {
    return sortedItems?.[0] || null
  }, [sortedItems])

  const label = useMemo(
    () => syncroItemMapping[props.itemType].labelPlural,
    [props.itemType]
  )

  const theme = useMantineTheme()

  if (userItems?.length === 0) return null

  return (
    <MyNextLink
      href={urls.pages.userItems(props.userId, props.itemType)}
      style={{
        color: theme.colors.dark[0],
      }}
    >
      <FlexCol align={'center'} mt={4}>
        {firstItem?.imageUrl ? (
          <SyncroItemImage item={firstItem} width={150} height={150} />
        ) : (
          <Box w={150} h={150} />
        )}

        <Text style={{ fontWeight: '500' }} mt={8}>
          {label}
        </Text>
        <Text>{userItems?.length} items</Text>
      </FlexCol>
    </MyNextLink>
  )
}

export default ProfileScreenRatingItem
