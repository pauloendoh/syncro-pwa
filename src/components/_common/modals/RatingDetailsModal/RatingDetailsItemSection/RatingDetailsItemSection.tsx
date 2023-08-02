import { Flex, Text } from '@mantine/core'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import { getItemTitleAndYear } from '../../../../../utils/domains/syncro-item/getItemTitleAndYear'
import FlexCol from '../../../flex/FlexCol'
import SyncroItemImage from '../../../image/SyncroItemImage/SyncroItemImage'

type Props = {
  item: SyncroItemDto
}

const RatingDetailsItemSection = ({ ...props }: Props) => {
  return (
    <Flex className="RatingDetailsItemSection" gap={12}>
      <FlexCol>
        <Text weight={600}>{getItemTitleAndYear(props.item)}</Text>
      </FlexCol>
      <SyncroItemImage item={props.item} showItemType={props.item.type} />
    </Flex>
  )
}

export default RatingDetailsItemSection
