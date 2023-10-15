import { Box, Container, Text } from '@mantine/core'
import { useQueryState } from 'next-usequerystate'
import { useMemo, useState } from 'react'
import { useUserItemsQuery } from '../../hooks/react-query/user-item/useUserItemsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { SortingByType } from '../../types/domain/others/SortingByTypes'
import { SyncroItemType } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { QueryParams } from '../../utils/queryParams'
import ItemTypeSelector from '../ExplorePageContent/MostRatedExploreSection/ItemTypeSelector/ItemTypeSelector'
import { useSortedItems } from '../UserProfilePage/ProfileScreenRatingItem/useSortedItems/useSortedItems'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import SortBySelector from './SortBySelector/SortBySelector'
import UserItemsGrid from './UserItemsGrid/UserItemsGrid'
import UserItemsList from './UserItemsList/UserItemsList'
import UserItemsMdTable from './UserItemsMdTable/UserItemsMdTable'
import UserItemsViewSelector from './UserItemsViewSelector/UserItemsViewSelector'

const UserItemsPage = () => {
  const { userId } = useMyRouterQuery()

  const [itemType, setItemType] = useQueryState<SyncroItemType>(
    QueryParams.type,
    {
      defaultValue: 'movie',
      parse: (value) => value as SyncroItemType,
    }
  )

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

  const { isSmallScreen } = useMyMediaQuery()

  const [selectedGenre] = useQueryState(QueryParams.genre)

  const [view, setView] = useState<'md' | 'lg' | 'grid'>('grid')

  const finalItems = useMemo(() => {
    if (selectedGenre) {
      return sortedItems.filter((item) => item.genres.includes(selectedGenre))
    }

    return sortedItems
  }, [selectedGenre, sortedItems])

  return (
    <LoggedLayout>
      <Container fluid>
        {/* <Grid> */}
        {/* <Grid.Col span={0} xs={0} sm={0} md={1} lg={2} xl={4} /> */}
        {/* <Grid.Col span={12} xs={12} sm={7} md={7} lg={5} xl={4}> */}
        <Container
          size="xs"
          fluid={isSmallScreen}
          px={isSmallScreen ? 0 : undefined}
        >
          <FlexVCenter justify={'space-between'}>
            <FlexVCenter gap={8}>
              <ItemTypeSelector
                value={itemType}
                onChange={(type) => {
                  setItemType(type)
                }}
                label="Type"
                width={150}
              />
              {!thisIsYourList && (
                <SortBySelector onChange={setSortingBy} value={sortingBy} />
              )}
            </FlexVCenter>

            <FlexVCenter mt={16}>
              <UserItemsViewSelector value={view} onChange={setView} />
            </FlexVCenter>
          </FlexVCenter>

          <Text size="lg" mt={16}>
            {items?.length} items
          </Text>

          {view === 'md' && (
            <Box mt={8}>
              <UserItemsMdTable
                items={finalItems}
                thisIsYourList={thisIsYourList}
              />
            </Box>
          )}

          {view === 'lg' && (
            <UserItemsList
              onRefresh={refetch}
              isLoading={isLoading}
              itemType={itemType}
              sortedItems={finalItems}
              sortingBy={sortingBy}
              thisIsYourList={thisIsYourList}
              filterByGenre={selectedGenre}
            />
          )}
          {view === 'grid' && (
            <UserItemsGrid items={finalItems} thisIsYourList={thisIsYourList} />
          )}
        </Container>
        {/* </Grid.Col> */}
        {/* <Grid.Col span={0} xs={0} sm={5} md={4} lg={4} xl={4}>
            {!isSmallScreen && (
              <>
                <GenresCountSection itemType={itemType} userId={userId} />
              </>
            )}
          </Grid.Col> */}
        {/* </Grid> */}
      </Container>
    </LoggedLayout>
  )
}

export default UserItemsPage
