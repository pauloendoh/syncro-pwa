import { NumberInput } from '@mantine/core'
import { RatingProgressDto } from '../../../../../types/domain/rating/RatingProgressDto'
import { RatingStatusType } from '../../../../../types/domain/rating/ratingStatusArray'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import FlexVCenter from '../../../flex/FlexVCenter'

type Props = {
  value: RatingProgressDto
  onChange: (ratingProgress: RatingProgressDto) => void
  item: SyncroItemDto
  status: RatingStatusType
}

const RatingProgressFields = ({ ...props }: Props) => {
  if (props.status === 'COMPLETED' || props.status === 'PLANNED') {
    return null
  }
  if (props.item.type === 'manga')
    return (
      <>
        <NumberInput
          label="Chapter"
          value={props.value.currentChapter}
          onChange={(value) => {
            let numValue = value === '' ? 0 : value
            if (numValue < 0) {
              numValue = 0
            }
            props.onChange({ ...props.value, currentChapter: numValue })
          }}
          min={0}
          w={100}
          styles={{
            root: {
              opacity: props.value.currentChapter === 0 ? 0.5 : 1,
            },
          }}
        />
      </>
    )

  if (props.item.type === 'tvSeries')
    return (
      <FlexVCenter gap={8}>
        <NumberInput
          label="Season"
          value={props.value.currentSeason}
          onChange={(value) => {
            let numValue = value === '' ? 0 : value
            if (numValue < 0) {
              numValue = 0
            }
            props.onChange({ ...props.value, currentSeason: numValue })
          }}
          min={0}
          w={72}
          styles={{
            root: {
              opacity: props.value.currentSeason === 0 ? 0.5 : 1,
            },
          }}
        />
        <NumberInput
          label="Episode"
          value={props.value.currentEpisode}
          onChange={(value) => {
            let numValue = value === '' ? 0 : value
            if (numValue < 0) {
              numValue = 0
            }
            props.onChange({ ...props.value, currentEpisode: numValue })
          }}
          min={0}
          w={72}
          styles={{
            root: {
              opacity: props.value.currentEpisode === 0 ? 0.5 : 1,
            },
          }}
        />
      </FlexVCenter>
    )

  return null
}

export default RatingProgressFields
