import { Container, Grid, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useGenresCountQuery } from '../../hooks/react-query/user-item/useGenresCountQuery'
import { useUserItemsQuery } from '../../hooks/react-query/user-item/useUserItemsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { SortingByType } from '../../types/domain/others/SortingByTypes'
import { SyncroItemType } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { useSortedItems } from '../UserProfilePage/ProfileScreenRatingItem/useSortedItems/useSortedItems'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import GenresCountSection from './GenresCountSection/GenresCountSection'
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

  const { data: genresCount } = useGenresCountQuery(itemType, userId)

  const { isSmallScreen } = useMyMediaQuery()

  return (
    <LoggedLayout>
      <Container fluid>
        <Grid>
          <Grid.Col span={0} xs={0} sm={0} md={1} lg={2} xl={4} />
          <Grid.Col span={12} xs={12} sm={7} md={7} lg={5} xl={4}>
            <Container
              size="xs"
              fluid={isSmallScreen}
              px={isSmallScreen ? 0 : undefined}
              pt={isSmallScreen ? 24 : undefined}
            >
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
          </Grid.Col>
          <Grid.Col span={0} xs={0} sm={5} md={4} lg={4} xl={4}>
            {!isSmallScreen && (
              <>
                <GenresCountSection itemType={itemType} userId={userId} />
              </>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </LoggedLayout>
  )
}

export default UserItemsPage
