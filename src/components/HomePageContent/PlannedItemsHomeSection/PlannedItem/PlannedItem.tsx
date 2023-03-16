import { Flex, Title } from '@mantine/core'
import { InterestDto } from '../../../../types/domain/interest/InterestDto'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import HomeRatingItemButtons from '../../HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'

type Props = {
  planned: InterestDto
}

const PlannedItem = (props: Props) => {
  const {
    planned: { syncroItem },
  } = props
  return (
    <FlexVCenter py={8}>
      <Flex gap={8}>
        <SyncroItemImage item={syncroItem} height={80} width={80} />

        <FlexCol
          justify={'space-between'}
          sx={() => ({
            fontSize: 13,
            svg: {
              height: 20,
            },
          })}
        >
          <Title order={6} lineClamp={2}>
            {syncroItem?.title}
          </Title>

          <HomeRatingItemButtons syncroItemId={syncroItem?.id!} gap={8} />
        </FlexCol>
      </Flex>
    </FlexVCenter>
  )
}

export default PlannedItem
