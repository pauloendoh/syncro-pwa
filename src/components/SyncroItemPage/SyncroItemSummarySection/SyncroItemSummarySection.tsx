import { Box, Text, Title } from '@mantine/core'
import { useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../_common/flex/FlexCol'
import MangaExtraInfoSection from '../MangaExtraInfoSection/MangaExtraInfoSection'
import GameExtraInfoSection from './GameExtraInfoSection/GameExtraInfoSection'

type Props = {
  item: SyncroItemDto
}

const SyncroItemSummarySection = ({ item }: Props) => {
  const [canToggleExpand, setCanToggleExpand] = useState(false)
  const [seeMore, setSeeMore] = useState<boolean | null>(null)
  const handleReflow = ({ text }: { clamped: boolean; text: string }) => {
    if (!item) return

    const isClamped = text.length < item.plotSummary.length

    if (isClamped) {
      setCanToggleExpand(true)
    }
  }

  return (
    <FlexCol>
      <Title order={5} weight={500}>
        Summary
      </Title>
      <Box
        mt={8}
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
          <LinesEllipsis
            text={item.plotSummary}
            maxLine={seeMore || seeMore === null ? 3 : 1000}
            onReflow={handleReflow}
          />
        )}
        {canToggleExpand && (
          <Box
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              width: 'fit-content',
              marginTop: 8,
            }}
            onClick={() => {
              if (seeMore === null) {
                setSeeMore(false)
              }
              if (seeMore === true) {
                setSeeMore(false)
              }
              if (seeMore === false) {
                setSeeMore(true)
              }
            }}
          >
            {seeMore === null && 'Show more'}
            {seeMore === true && 'Show more '}
            {seeMore === false && 'Show less '}
          </Box>
        )}
      </Box>

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
    </FlexCol>
  )
}

export default SyncroItemSummarySection
