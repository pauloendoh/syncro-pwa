import { Container, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useUserItemsQuery } from '../../hooks/react-query/user/useUserItemsQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { SortingByTypes } from '../../types/domain/others/SortingByTypes'
import { syncroItemMapping } from '../../types/domain/syncro-item/SyncroItemType/syncroItemMapping'
import { SyncroItemType } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { useSortedItems } from '../UserPageContent/ProfileScreenRatingItem/useSortedItems/useSortedItems'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import UserItemsList from './UserItemsList/UserItemsList'

type Props = {}

const UserItemsPageContent = (props: Props) => {
  const { userId, type } = useMyRouterQuery()

  const itemType = type as SyncroItemType

  const {
    data: items,
    isLoading,
    refetch,
  } = useUserItemsQuery(userId, itemType as SyncroItemType)

  const { data: userInfo } = useUserInfoQuery(userId)

  const headerTitle = useMemo(() => {
    if (!userInfo?.username) return 'User items'

    return `${userInfo.username} - ${syncroItemMapping[itemType].labelPlural}`
  }, [userInfo, itemType])

  // useEffect(
  //   () =>
  //     navigation.setOptions({
  //       headerTitle,
  //     }),
  //   [headerTitle]
  // )

  const authUser = useAuthStore((s) => s.authUser)

  const thisIsYourList = useMemo(
    () => authUser?.id === userId,
    [authUser, userId]
  )

  const [sortingBy, setSortingBy] = useState<SortingByTypes>('theirRatingDesc')

  const sortedItems = useSortedItems({ items, sortingBy })

  return (
    <LoggedLayout>
      <Container size="xs">
        <FlexVCenter>
          <Text size="lg">{items?.length} items</Text>
          {/* <SortingBySection
              onChangeSortingBy={setSortingBy}
              sortingBy={sortingBy}
              thisIsYourList={thisIsYourList}
            /> */}
        </FlexVCenter>

        <UserItemsList
          onRefresh={refetch}
          isLoading={isLoading}
          itemType={itemType}
          onPressItem={(item) => {
            // navigation.push('SyncroItem', {
            //   itemId: item.id,
            //   initialValue: item,
            // })
          }}
          sortedItems={sortedItems}
          sortingBy={sortingBy}
          thisIsYourList={thisIsYourList}
        />
      </Container>
    </LoggedLayout>
  )
}

export default UserItemsPageContent
