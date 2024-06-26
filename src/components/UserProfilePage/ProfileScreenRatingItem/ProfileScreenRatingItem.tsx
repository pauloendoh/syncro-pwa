import { Box, Text, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useUserItemsQuery } from '../../../hooks/react-query/user-item/useUserItemsQuery'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { syncroItemMapping } from '../../../types/domain/syncro-item/SyncroItemType/syncroItemMapping'
import { urls } from '../../../utils/urls/urls'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'
import { useSortedItems } from './useSortedItems/useSortedItems'

interface Props {
  userId: string
  itemType: SyncroItemType
}

const ProfileScreenRatingItem = (props: Props) => {
  const { data: userItems, isLoading } = useUserItemsQuery(
    props.userId,
    props.itemType
  )

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
        {firstItem ? (
          <SyncroItemImage item={firstItem} />
        ) : (
          <Box w={100} h={133} />
        )}

        <Text style={{ fontWeight: '500' }} mt={8}>
          {label}
        </Text>

        <Text>
          {isLoading && 'Loading...'}
          {userItems && userItems?.length > 0 && `${userItems.length} items`}
        </Text>
      </FlexCol>
    </MyNextLink>
  )
}

export default ProfileScreenRatingItem
