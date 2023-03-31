import { Text } from '@mantine/core'
import { shortNumberFormatter, upToNDecimals } from 'endoh-utils'
import { useMemo } from 'react'
import { IoMdEye } from 'react-icons/io'
import { MdStar } from 'react-icons/md'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import { urls } from '../../../../../utils/urls'
import FlexCol from '../../../../_common/flex/FlexCol'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../../_common/overrides/MyNextLink'

interface Props {
  avgRating: number
  ratingCount: number
  title?: string
  itemId?: string
}

const SearchItemLeftSection = (props: Props) => {
  const { isSmallScreen } = useMyMediaQuery()

  const seeDetails = useMemo(() => {
    return props.ratingCount === 0 || props.avgRating === 0
  }, [props.avgRating, props.ratingCount])

  if (seeDetails && props.itemId)
    return (
      <MyNextLink href={urls.pages.syncroItem(props.itemId)}>
        <Text>See details</Text>
      </MyNextLink>
    )

  return (
    <FlexCol>
      <Text>{props.title || 'IMDb'}</Text>

      <FlexCol gap={4}>
        <FlexVCenter gap={8}>
          <MdStar color={'#FFB600'} size={18} />
          <Text>{upToNDecimals(props.avgRating, 1)}/10</Text>
        </FlexVCenter>
      </FlexCol>

      <FlexCol gap={4}>
        <FlexVCenter gap={8}>
          <IoMdEye size={18} />
          <Text>
            {shortNumberFormatter(props.ratingCount)}{' '}
            {!isSmallScreen && 'votes'}
          </Text>
        </FlexVCenter>
      </FlexCol>
    </FlexCol>
  )
}

export default SearchItemLeftSection
