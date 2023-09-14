import { Box, Container, Grid } from '@mantine/core'
import { useMemo } from 'react'
import ReactPlayer from 'react-player'
import { useItemReviewQuery } from '../../hooks/react-query/review/useItemReviewQuery'
import { useSyncroItemDetailsQuery } from '../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import { SyncroItemDto } from '../../types/domain/syncro-item/SyncroItemDto'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyPaper from '../_common/overrides/MyPaper'
import AuthorsPaper from './ItemPageRightSection/AuthorsPaper/AuthorsPaper'
import ItemPageRightSection from './ItemPageRightSection/ItemPageRightSection'
import MangaPanelsSection from './MangaPanelsSection/MangaPanelsSection'
import SyncroItemPaperContent from './SyncroItemPaperContent/SyncroItemPaperContent'
import TrailerSection from './TrailerSection/TrailerSection'
import UserReviewsSection from './UserReviewsSection/UserReviewsSection'
import UsersAlsoLikedSection from './UsersAlsoLikedSection/UsersAlsoLikedSection'

type Props = {
  initialData: SyncroItemDto | null
}

const SyncroItemPage = (props: Props) => {
  const { syncroItemId } = useMyRouterQuery()
  const { data: item, isLoading } = useSyncroItemDetailsQuery(syncroItemId, {
    initialData: props.initialData || undefined,
  })
  const canHaveTrailers =
    item?.type === 'tvSeries' || item?.type === 'movie' || item?.type === 'game'

  const { isMobile, isSmallScreen } = useMyMediaQuery()

  const { data: reviews } = useItemReviewQuery(syncroItemId!)

  const hasAuthors = useMemo(() => {
    return (
      item?.mangaExtraInfo?.authors && item?.mangaExtraInfo?.authors.length > 0
    )
  }, [item])

  return (
    <LoggedLayout>
      <Grid w="100%">
        <Grid.Col span={0} xs={0} sm={0} md={1} lg={2} xl={4} />
        <Grid.Col span={12} xs={12} sm={7} md={7} lg={5} xl={4}>
          <Container size="xs">
            <MyPaper
              p={isMobile ? 0 : undefined}
              bg={isMobile ? 'transparent' : undefined}
            >
              <SyncroItemPaperContent
                initialData={props.initialData}
                syncroItemId={syncroItemId}
              />
            </MyPaper>

            {canHaveTrailers && (
              <Box mt={24}>
                <TrailerSection item={item} />
              </Box>
            )}
            {item?.youtubeMusicUrl && (
              <Box mt={24}>
                <ReactPlayer
                  url={item?.youtubeMusicUrl!}
                  controls
                  width={'100%'}
                />
              </Box>
            )}
            {item?.type === 'manga' && (
              <Box mt={24}>
                <MangaPanelsSection syncroItem={item} />
              </Box>
            )}

            {isSmallScreen && item && hasAuthors && (
              <AuthorsPaper item={item} />
            )}

            {item && (
              <Box mt={32}>
                <UsersAlsoLikedSection itemId={item.id!} />
              </Box>
            )}
            {reviews && (
              <Box mt={32}>
                <UserReviewsSection reviews={reviews} />
              </Box>
            )}
          </Container>
        </Grid.Col>

        <Grid.Col span={0} xs={0} sm={5} md={4} lg={4} xl={4}>
          {item && <ItemPageRightSection item={item} />}
        </Grid.Col>
      </Grid>
    </LoggedLayout>
  )
}

export default SyncroItemPage
