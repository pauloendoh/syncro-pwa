import { IconBaseProps } from 'react-icons/lib'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatusArray'
import { useRatingStatusIcon } from '../../../../types/domain/rating/useRatingStatusIcon/useRatingStatusIcon'

type Props = {
  status: RatingStatusType
  iconProps?: IconBaseProps
}

const StatusIcon = ({ ...props }: Props) => {
  const Icon = useRatingStatusIcon(props.status)
  return <Icon {...props.iconProps} />
}

export default StatusIcon
