import { Text, Tooltip, useMantineTheme } from '@mantine/core'
import { MdLock } from 'react-icons/md'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { useRatingStatusIcon } from '../../../../types/domain/rating/useRatingStatusIcon/useRatingStatusIcon'
import { urls } from '../../../../utils/urls/urls'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import { useRatingStatusLabel } from '../getRatingStatusLabel/getRatingStatusLabel'

type Props = {
  rating: RatingDto
  alwaysShowStatusIcon?: boolean
}

// PE 2/3 - maybe improve this component name?
const UsernameRatedRow = ({ ...props }: Props) => {
  const { isMobile } = useMyMediaQuery()

  const statusLabel = useRatingStatusLabel({
    status: props.rating.status,
    type: props.rating.syncroItem?.type!,
    hasRated: !!props.rating.ratingValue,
    isMobile,
  })

  const theme = useMantineTheme()

  const StatusIcon = useRatingStatusIcon(props.rating.status)

  return (
    <Text size={isMobile ? 'sm' : undefined}>
      <MyNextLink
        href={urls.pages.userProfile(props.rating.userId)}
        style={{
          color: 'unset',
        }}
      >
        <Text weight={600} span>
          {props.rating.user?.username}
        </Text>{' '}
      </MyNextLink>
      {statusLabel}{' '}
      <b
        style={{
          color: theme.colors.yellow[5],
          marginRight: 2,
        }}
      >
        {props.rating.ratingValue}
      </b>
      {(props.alwaysShowStatusIcon || !props.rating.ratingValue) && (
        <StatusIcon
          style={{
            fontSize: 16,
            position: 'relative',
            top: 3,
            color: theme.colors.yellow[5],
          }}
        />
      )}
      {props.rating.isPrivate && (
        <Tooltip label="This entry is private">
          <span
            style={{
              position: 'relative',
              top: 1,
            }}
          >
            <MdLock style={{ fontSize: 16 }} />
          </span>
        </Tooltip>
      )}
    </Text>
  )
}

export default UsernameRatedRow
