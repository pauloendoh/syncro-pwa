import { Box, Container, Grid, Text, Title } from '@mantine/core'
import { useQueryState } from 'next-usequerystate'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { useAuthUser } from '../../hooks/domains/auth/useAuthUser'
import { useSyncroItemTypeMap } from '../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useUserItemsCountDetailsQuery } from '../../hooks/react-query/syncro-item/useUserItemsCountDetailsQuery'
import { useUserItemsQuery } from '../../hooks/react-query/user-item/useUserItemsQuery'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useIsBackStore from '../../hooks/zustand/useIsBackStore'
import useUserItemsFilterStore, {
  resetUserItemsFilterStore,
} from '../../hooks/zustand/useUserItemsFilterStore'
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

// PE 2/3 - maybe change variables order?
const UserItemsPage = () => {
  const { userId } = useMyRouterQuery()

  const { data: userInfo } = useUserInfoQuery(userId)

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

  const { isBack } = useIsBackStore()
  useEffect(() => {
    if (!isBack) {
      resetUserItemsFilterStore()
    }
  }, [])

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

  const authUser = useAuthUser()

  const thisIsYourList = useMemo(
    () => authUser?.id === userId,
    [authUser, userId]
  )

  const [sortingBy, setSortingBy] = useState<SortingByType>('theirRatingDesc')

  const sortedItems = useSortedItems({ items, sortingBy })

  const { isSmallScreen } = useMyMediaQuery()

  const [selectedGenre] = useQueryState(QueryParams.genre)

  const filter = useUserItemsFilterStore()

  const finalItems = useMemo(() => {
    let filteredItems = [...sortedItems]

    if (selectedGenre) {
      filteredItems.filter((item) => item.genres.includes(selectedGenre))
    }

    if (filter.title) {
      filteredItems = filteredItems.filter((item) =>
        textContainsWords(item.title, filter.title)
      )
    }

    if (filter.byStatus) {
      filteredItems = filteredItems.filter((item) => {
        return item.ratings?.[0]?.status === filter.byStatus
      })
    }

    return filteredItems
  }, [selectedGenre, sortedItems, filter.title, filter.byStatus])

  const typeMap = useSyncroItemTypeMap({
    itemType: itemType,
  })

  const { data: userItemsCount } = useUserItemsCountDetailsQuery(userId)

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
              <UserImage
                pictureUrl={userInfo?.profile?.pictureUrl}
                userIdForLink={thisIsYourList ? authUser?.id : userInfo?.id}
              />
              <Title order={3}>
                {userInfo?.username}'s {typeMap.getTypeLabelLowerCase(true)}
              </Title>
            </FlexVCenter>
            {isSmallScreen && (
              <Box mt={16} w="100%">
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
                  label="Item type"
                  width={150}
                  entriesCountFromUserId={userInfo?.id}
                />
                <SortBySelector
                  onChange={setSortingBy}
                  value={sortingBy}
                  highestRatingLabel={
                    thisIsYourList ? 'My rating' : 'Their rating'
                  }
                />
              </FlexVCenter>

              <FlexVCenter mt={16}>
                <UserItemsViewSelector value={view} onChange={setView} />
              </FlexVCenter>
            </FlexVCenter>

            <Text size="lg" mt={16}>
              {finalItems.length} items
            </Text>

            {isLoading ? (
              <CenterLoader mt={24} />
            ) : (
              <>
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
              </>
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
