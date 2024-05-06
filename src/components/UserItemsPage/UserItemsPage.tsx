import { Box, Container, Grid, Text, Title } from '@mantine/core'
import { useQueryState } from 'next-usequerystate'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { useUserItemsQuery } from '../../hooks/react-query/user-item/useUserItemsQuery'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import useUserItemsFilterStore from '../../hooks/zustand/useUserItemsFilterStore'
import { SortingByType } from '../../types/domain/others/SortingByTypes'
import { SyncroItemType } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { htmlTitles } from '../../utils/consts/htmlTitles'
import { localStorageKeys } from '../../utils/consts/localStorageKeys'
import { QueryParams } from '../../utils/queryParams'
import textContainsWords from '../../utils/text/textContainsWords'
import ItemTypeSelector from '../ExplorePageContent/BrowseItemsExploreSection/ItemTypeSelector/ItemTypeSelector'
import { useSortedItems } from '../UserProfilePage/ProfileScreenRatingItem/useSortedItems/useSortedItems'
import FlexVCenter from '../_common/flex/FlexVCenter'
import UserImage from '../_common/image/SyncroItemImage/UserImage/UserImage'
import DefaultLayout from '../_common/layout/DefaultLayout'
import CenterLoader from '../_common/overrides/CenterLoader/CenterLoader'
import SortBySelector from './SortBySelector/SortBySelector'
import UserItemsFilter from './UserItemsFilter/UserItemsFilter'
import UserItemsGrid from './UserItemsGrid/UserItemsGrid'
import UserItemsList from './UserItemsList/UserItemsList'
import UserItemsMdTable from './UserItemsMdTable/UserItemsMdTable'
import UserItemsViewSelector from './UserItemsViewSelector/UserItemsViewSelector'

const UserItemsPage = () => {
  const { userId } = useMyRouterQuery()

  type ViewType = 'md' | 'lg' | 'grid'
  const [view, setView] = useState<ViewType>('grid')

  useEffect(() => {
    const localView = localStorage.getItem(localStorageKeys.userItemsViewType)
    if (localView) {
      setView(localView as ViewType)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(localStorageKeys.userItemsViewType, view)
  }, [view])

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

  const { data: userInfo } = useUserInfoQuery(userId)

  const authUser = useAuthStore((s) => s.authUser)

  const thisIsYourList = useMemo(
    () => authUser?.id === userId,
    [authUser, userId]
  )

  const [sortingBy, setSortingBy] = useState<SortingByType>('theirRatingDesc')

  const sortedItems = useSortedItems({ items, sortingBy })

  const { isSmallScreen } = useMyMediaQuery()

  const [selectedGenre] = useQueryState(QueryParams.genre)

  const { title: titleFilter } = useUserItemsFilterStore()

  const finalItems = useMemo(() => {
    let filteredItems = [...sortedItems]

    if (selectedGenre) {
      filteredItems.filter((item) => item.genres.includes(selectedGenre))
    }

    if (titleFilter) {
      filteredItems = filteredItems.filter((item) =>
        textContainsWords(item.title, titleFilter)
      )
    }

    return filteredItems
  }, [selectedGenre, sortedItems, titleFilter])

  return (
    <DefaultLayout>
      <Head>
        <title>
          {htmlTitles.userItems({
            username: userInfo?.username || '',
            itemType: itemType,
          })}
        </title>
      </Head>
      <Grid
        sx={{
          margin: '0 !important',
        }}
      >
        <Grid.Col span={12} xs={12} sm={8} md={8} lg={8} xl={8}>
          <Container fluid={isSmallScreen}>
            <FlexVCenter gap={16}>
              <UserImage pictureUrl={userInfo?.profile?.pictureUrl} />
              <Title order={3}>{userInfo?.username}'s items</Title>
            </FlexVCenter>
            {isSmallScreen && (
              <Box w={300} mt={16}>
                <UserItemsFilter />
              </Box>
            )}

            <FlexVCenter gap={24} mt={16}>
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
              {finalItems.length} items
            </Text>

            {isLoading && <CenterLoader mt={24} />}

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
                isLoading={false}
                itemType={itemType}
                sortedItems={finalItems}
                sortingBy={sortingBy}
                thisIsYourList={thisIsYourList}
                filterByGenre={selectedGenre}
              />
            )}
            {view === 'grid' && (
              <UserItemsGrid
                items={finalItems}
                thisIsYourList={thisIsYourList}
              />
            )}
          </Container>
        </Grid.Col>
        {!isSmallScreen && (
          <Grid.Col span={0} xs={0} sm={4} md={4} lg={4} xl={4}>
            <Box
              sx={{
                minWidth: '240px',
                maxWidth: '300px',
              }}
            >
              <UserItemsFilter />
            </Box>
          </Grid.Col>
        )}
      </Grid>
    </DefaultLayout>
  )
}

export default UserItemsPage
