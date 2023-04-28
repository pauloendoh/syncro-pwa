import { Box, Tooltip } from '@mantine/core'
import { MdRemoveRedEye } from 'react-icons/md'
import { urls } from '../../../../../utils/urls'
import MyNextLink from '../../../overrides/MyNextLink'

type Props = {
  username?: string
  pictureUrl?: string
  widthHeight?: number
  userIdAndLink?: string
  showLookingForRecommendationIcon?: boolean
}

const UserImage = (props: Props) => {
  const image = (
    <div
      style={{
        position: 'relative',
      }}
    >
      <img
        alt={props.username || 'username'}
        src={props.pictureUrl || '/images/avatars/avatar.png'}
        width={props.widthHeight || 40}
        height={props.widthHeight || 40}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      {props.showLookingForRecommendationIcon && (
        <Tooltip
          label="Looking for recommendations"
          position="bottom"
          withArrow
        >
          <Box pos={'absolute'} right={0} bottom={-8}>
            <MdRemoveRedEye />
          </Box>
        </Tooltip>
      )}
    </div>
  )

  if (props.userIdAndLink)
    return (
      <MyNextLink href={urls.pages.user(props.userIdAndLink)}>
        {image}
      </MyNextLink>
    )

  return image
}

export default UserImage
