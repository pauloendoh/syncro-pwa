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
  if (props.item.type === 'manga')
    return (
      <NumberInput
        label="Chapter progress"
        value={props.value.currentChapter}
        onChange={(value) => {
          let numValue = value === '' ? 0 : value
          if (numValue < 0) {
            numValue = 0
          }
          props.onChange({ ...props.value, currentChapter: numValue })
        }}
        min={0}
        w={120}
      />
    )

  if (props.item.type === 'tvSeries')
    return (
      <FlexVCenter gap={8}>
        <NumberInput
          label="Season progress"
          value={props.value.currentSeason}
          onChange={(value) => {
            let numValue = value === '' ? 0 : value
            if (numValue < 0) {
              numValue = 0
            }
            props.onChange({ ...props.value, currentSeason: numValue })
          }}
          min={0}
          w={120}
        />
        <NumberInput
          label="Episode progress"
          value={props.value.currentEpisode}
          onChange={(value) => {
            let numValue = value === '' ? 0 : value
            if (numValue < 0) {
              numValue = 0
            }
            props.onChange({ ...props.value, currentEpisode: numValue })
          }}
          min={0}
          w={120}
        />
      </FlexVCenter>
    )

  if (props.item.type === 'game') {
    return (
      <NumberInput
        label="Hours played"
        value={props.value.hoursToBeatGame}
        onChange={(value) => {
          let numValue = value === '' ? 0 : value
          if (numValue < 0) {
            numValue = 0
          }
          props.onChange({ ...props.value, hoursToBeatGame: numValue })
        }}
        min={0}
        w={120}
      />
    )
  }

  return null
}

export default RatingProgressFields
