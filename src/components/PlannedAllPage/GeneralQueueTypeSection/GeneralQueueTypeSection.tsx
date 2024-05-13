import { useMantineTheme } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import Span from '../../_common/text/Span'
import GeneralQueueTypeSectionItem from './GeneralQueueTypeSectionItem/GeneralQueueTypeSectionItem'

type Props = {
  itemType: SyncroItemType
  entries: RatingDto[]
}

const GeneralQueueTypeSection = ({ ...props }: Props) => {
  const theme = useMantineTheme()
  const typeMap = useSyncroItemTypeMap({
    itemType: props.itemType,
  })

  return (
    <div key={props.itemType}>
      <FlexCol
        w={280}
        p={16}
        bg={theme.colors.dark[5]}
        sx={{
          borderRadius: 8,
        }}
      >
        <Span weight={'bold'}>
          {typeMap.getTypeLabel(props.entries.length > 0)} (
          {props.entries.length})
        </Span>
        <FlexCol gap={8} mt={16}>
          {props.entries.map((rating) => (
            <GeneralQueueTypeSectionItem key={rating.id} entry={rating} />
          ))}
        </FlexCol>
      </FlexCol>
    </div>
  )
}

export default GeneralQueueTypeSection
