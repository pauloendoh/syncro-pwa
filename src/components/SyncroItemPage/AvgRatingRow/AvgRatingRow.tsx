import { Text, useMantineTheme } from '@mantine/core'
import { shortNumberFormatter, upToNDecimals } from 'endoh-utils'
import { MdStarRate } from 'react-icons/md'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import { useGetFinalRatingCountAvgSite } from './useGetFinalRatingCountAvgSite/useGetFinalRatingCountAvgSite'

type Props = {
  item: SyncroItemDto
}

const AvgRatingRow = ({ item }: Props) => {
  const { isMobile } = useMyMediaQuery()
  const theme = useMantineTheme()

  const { ratingCount, avgRating, finalSource } =
    useGetFinalRatingCountAvgSite(item)

  return (
    <FlexVCenter gap={isMobile ? 24 : 40}>
      <FlexVCenter gap={4} sx={{ height: 'fit-content' }}>
        <MdStarRate color={theme.colors.yellow[5]} size={16} />
        {avgRating ? (
          <Text>
            {upToNDecimals(avgRating, 1)}
            /10
          </Text>
        ) : (
          <Text>?/10</Text>
        )}
      </FlexVCenter>

      <Text size="sm">
        {shortNumberFormatter(ratingCount)}{' '}
        {ratingCount === 1 ? 'vote' : 'votes'} {`on ${finalSource}`}
      </Text>
    </FlexVCenter>
  )
}

export default AvgRatingRow
