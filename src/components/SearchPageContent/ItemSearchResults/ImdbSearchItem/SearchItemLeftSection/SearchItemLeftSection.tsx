import { Text } from '@mantine/core'
import { shortNumberFormatter, upToNDecimals } from 'endoh-utils'
import { useMemo } from 'react'
import { IoMdEye } from 'react-icons/io'
import { MdStar } from 'react-icons/md'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import { useGetFinalRatingCountAvgSite } from '../../../../SyncroItemPage/AvgRatingRow/useGetFinalRatingCountAvgSite/useGetFinalRatingCountAvgSite'
import SyncroItemLink from '../../../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../../../_common/flex/FlexCol'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'

interface Props {
  avgRating: number
  ratingCount: number
  title?: string
  itemId?: string
  item: SyncroItemDto
}

const SearchItemLeftSection = ({ item, ...props }: Props) => {
  const { avgRating, finalSource, ratingCount } =
    useGetFinalRatingCountAvgSite(item)

  const seeDetails = useMemo(() => {
    return ratingCount === 0 || avgRating === 0
  }, [avgRating, ratingCount])

  if (seeDetails && props.itemId)
    return (
      <SyncroItemLink item={item}>
        <Text>See details</Text>
      </SyncroItemLink>
    )

  return (
    <FlexCol>
      <Text>{finalSource}</Text>

      {ratingCount > 0 && (
        <FlexVCenter gap={8}>
          <MdStar color={'#FFB600'} size={18} />
          <Text>{upToNDecimals(avgRating, 1)}/10</Text>
        </FlexVCenter>
      )}

      <FlexVCenter gap={8}>
        <IoMdEye size={18} />
        <Text>
          {shortNumberFormatter(ratingCount)}
          {ratingCount === 1 ? ' vote' : ' votes'}
        </Text>
      </FlexVCenter>
    </FlexCol>
  )
}

export default SearchItemLeftSection
