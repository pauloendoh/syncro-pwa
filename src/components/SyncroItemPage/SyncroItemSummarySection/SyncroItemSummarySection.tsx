import { Box, Skeleton, Text, Title } from '@mantine/core'
import { useMemo } from 'react'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../_common/flex/FlexCol'
import MySeeMore from '../../_common/text/MySeeMore/MySeeMore'
import MangaExtraInfoSection from '../MangaExtraInfoSection/MangaExtraInfoSection'
import BookExtraInfoSection from './BookExtraInfoSection/BookExtraInfoSection'
import GameExtraInfoSection from './GameExtraInfoSection/GameExtraInfoSection'

type Props = {
  item: SyncroItemDto
  isPreview?: boolean
}

const SyncroItemSummarySection = ({ item, ...props }: Props) => {
  const showSkeleton = useMemo(
    () =>
      (item.type === 'manga' && !item.mangaExtraInfo) ||
      (item.type === 'game' && !item.gameExtraInfo),
    [item]
  )

  return (
    <FlexCol>
      {!props.isPreview && (
        <Title order={5} weight={500} mb={8}>
          Summary
        </Title>
      )}

      <Box
        sx={(theme) => ({
          a: {
            color: theme.colors.primary,
          },
          '.LinesEllipsis': {
            whiteSpace: 'pre-wrap',
          },
        })}
      >
        {item.plotSummary.length === 0 && <Text>No summary available</Text>}
        {item.plotSummary.length > 0 && (
          <MySeeMore
            maxLines={4}
            buttonsText={{
              seeMore: 'Read more',
              seeLess: 'Read less',
            }}
          >
            {item.plotSummary}
          </MySeeMore>
        )}
      </Box>

      {showSkeleton && (
        <Box mt={24}>
          <Skeleton h={item.type === 'manga' ? 46.5 : 23.5} w={280} />
        </Box>
      )}

      {item.mangaExtraInfo && (
        <Box mt={24}>
          <MangaExtraInfoSection info={item.mangaExtraInfo} />
        </Box>
      )}
      {item.gameExtraInfo && !!item.gameExtraInfo.platforms.length && (
        <Box mt={24}>
          <GameExtraInfoSection info={item.gameExtraInfo} />
        </Box>
      )}

      {item.bookExtraInfo && (
        <Box mt={24}>
          <BookExtraInfoSection info={item.bookExtraInfo} />
        </Box>
      )}
    </FlexCol>
  )
}

export default SyncroItemSummarySection
