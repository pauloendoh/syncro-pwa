import { Flex, Text, useMantineTheme } from '@mantine/core'
import { shortNumberFormatter, upToNDecimals } from 'endoh-utils'
import { MdStarRate } from 'react-icons/md'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import { useGetFinalRatingCountAvgSite } from './useGetFinalRatingCountAvgSite/useGetFinalRatingCountAvgSite'

type Props = {
  item: SyncroItemDto
  isPreview?: boolean
}

const AvgRatingRow = ({ item, ...props }: Props) => {
  const { isMobile } = useMyMediaQuery()
  const theme = useMantineTheme()

  const { ratingCount, avgRating, finalSource } =
    useGetFinalRatingCountAvgSite(item)

  return (
    <Flex gap={isMobile || props.isPreview ? 16 : 24}>
      <FlexVCenter gap={4} sx={{ height: 'fit-content' }}>
        <MdStarRate color={theme.colors.yellow[5]} size={16} />
        {ratingCount === 0 && <Text>No ratings yet</Text>}
        {ratingCount > 0 && (
          <Text size={isMobile || props.isPreview ? 'sm' : undefined}>
            {upToNDecimals(avgRating, 1)}
            /10
          </Text>
        )}
      </FlexVCenter>

      {ratingCount > 0 && (
        <Text size={isMobile || props.isPreview ? 'sm' : undefined}>
          {shortNumberFormatter(ratingCount)}{' '}
          {ratingCount === 1 ? 'vote' : 'votes'}
          {` on ${finalSource}`}
        </Text>
      )}
    </Flex>
  )
}

export default AvgRatingRow
