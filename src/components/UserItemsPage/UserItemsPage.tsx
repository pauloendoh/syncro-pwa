import { Container, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useUserItemsQuery } from '../../hooks/react-query/user/useUserItemsQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { SortingByType } from '../../types/domain/others/SortingByTypes'
import { SyncroItemType } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { useSortedItems } from '../UserProfilePage/ProfileScreenRatingItem/useSortedItems/useSortedItems'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import SortBySelector from './SortBySelector/SortBySelector'
import UserItemsList from './UserItemsList/UserItemsList'

const UserItemsPage = () => {
  const { userId, type } = useMyRouterQuery()

  const itemType = type as SyncroItemType

  const {
    data: items,
    isLoading,
    refetch,
  } = useUserItemsQuery(userId, itemType as SyncroItemType)

  const authUser = useAuthStore((s) => s.authUser)

  const thisIsYourList = useMemo(
    () => authUser?.id === userId,
    [authUser, userId]
  )

  const [sortingBy, setSortingBy] = useState<SortingByType>('theirRatingDesc')

  const sortedItems = useSortedItems({ items, sortingBy })

  return (
    <LoggedLayout>
      <Container size="xs">
        <FlexVCenter justify={'space-between'}>
          <Text size="lg">{items?.length} items</Text>
          {!thisIsYourList && (
            <SortBySelector onChange={setSortingBy} value={sortingBy} />
          )}
        </FlexVCenter>

        <UserItemsList
          onRefresh={refetch}
          isLoading={isLoading}
          itemType={itemType}
          sortedItems={sortedItems}
          sortingBy={sortingBy}
          thisIsYourList={thisIsYourList}
        />
      </Container>
    </LoggedLayout>
  )
}

export default UserItemsPage
