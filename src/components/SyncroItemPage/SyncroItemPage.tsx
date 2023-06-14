import { Box, Container } from '@mantine/core'
import ReactPlayer from 'react-player'
import { useSyncroItemTypeMap } from '../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useItemReviewQuery } from '../../hooks/react-query/review/useItemReviewQuery'
import { useSyncroItemDetailsQuery } from '../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import { SyncroItemDto } from '../../types/domain/syncro-item/SyncroItemDto'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyPaper from '../_common/overrides/MyPaper'
import ItemReviewsSection from './ItemReviewsSection/ItemReviewsSection'
import MangaPanelsSection from './MangaPanelsSection/MangaPanelsSection'
import SyncroItemPaperContent from './SyncroItemPaperContent/SyncroItemPaperContent'
import TrailerSection from './TrailerSection/TrailerSection'
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

  const itemTypeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })

  const { isMobile } = useMyMediaQuery()

  const { data: reviews } = useItemReviewQuery(syncroItemId!)

  return (
    <LoggedLayout>
      <Container size="sm">
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
            <TrailerSection itemId={syncroItemId!} />
          </Box>
        )}
        {item?.youtubeMusicUrl && (
          <Box mt={24}>
            <ReactPlayer url={item?.youtubeMusicUrl!} controls width={'100%'} />
          </Box>
        )}
        {item?.type === 'manga' && (
          <Box mt={24}>
            <MangaPanelsSection syncroItem={item} />
          </Box>
        )}

        {item && (
          <Box mt={32}>
            <UsersAlsoLikedSection itemId={item.id!} />
          </Box>
        )}
        {reviews && (
          <Box mt={32}>
            <ItemReviewsSection reviews={reviews} />
          </Box>
        )}
      </Container>
    </LoggedLayout>
  )
}

export default SyncroItemPage
