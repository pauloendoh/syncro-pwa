import { Text } from '@mantine/core'
import { shortNumberFormatter } from 'endoh-utils'
import { IoMdEye } from 'react-icons/io'
import { MdStar } from 'react-icons/md'
import FlexCol from '../../../../_common/flex/FlexCol'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'

interface Props {
  avgRating: number
  ratingCount: number
  title?: string
}

// PE 1/3 - rename this
const SearchItemImdbSection = (props: Props) => {
  return (
    <FlexCol w={100}>
      <Text weight={500}>{props.title || 'IMDb'}</Text>

      <FlexCol gap={4}>
        <FlexVCenter gap={8}>
          <MdStar color={'#FFB600'} size={18} />
          <Text>{props.avgRating}/10</Text>
        </FlexVCenter>
      </FlexCol>

      <FlexCol gap={4}>
        <FlexVCenter gap={8}>
          <IoMdEye size={18} />
          <Text>{shortNumberFormatter(props.ratingCount)} votes</Text>
        </FlexVCenter>
      </FlexCol>
    </FlexCol>
  )
}

export default SearchItemImdbSection
