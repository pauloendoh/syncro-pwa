import { Box, Tooltip } from '@mantine/core'
import { useState } from 'react'
import { MdRemoveRedEye } from 'react-icons/md'
import { urls } from '../../../../../utils/urls/urls'
import MyNextLink from '../../../overrides/MyNextLink'

type Props = {
  username?: string
  pictureUrl?: string
  widthHeight?: number
  userIdForLink?: string
  showLookingForRecommendationIcon?: boolean
}

const UserImage = (props: Props) => {
  const [image, setImage] = useState(
    props.pictureUrl ||
      'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png'
  )

  const ImageComponent = (
    <div
      style={{
        position: 'relative',
      }}
    >
      <img
        alt={props.username ?? 'username'}
        src={image}
        width={props.widthHeight ?? 40}
        height={props.widthHeight ?? 40}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          width: props.widthHeight ?? 40,
          height: props.widthHeight ?? 40,
        }}
        onError={(e) => {
          setImage(
            'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png'
          )
        }}
      />
      {props.showLookingForRecommendationIcon && (
        <Tooltip label={'Looking for recommendations'} position="bottom">
          <Box pos={'absolute'} right={0} bottom={-8}>
            <MdRemoveRedEye />
          </Box>
        </Tooltip>
      )}
    </div>
  )

  if (props.userIdForLink)
    return (
      <MyNextLink href={urls.pages.userProfile(props.userIdForLink)}>
        {ImageComponent}
      </MyNextLink>
    )

  return ImageComponent
}

export default UserImage
