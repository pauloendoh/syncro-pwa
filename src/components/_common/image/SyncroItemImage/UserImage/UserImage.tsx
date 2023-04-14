import { urls } from '../../../../../utils/urls'
import MyNextLink from '../../../overrides/MyNextLink'

type Props = {
  username?: string
  pictureUrl?: string
  widthHeight?: number
  userIdAndLink?: string
}

const UserImage = (props: Props) => {
  const image = (
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
