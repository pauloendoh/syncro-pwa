import { memo } from 'react'
import { useUserInfoQuery } from '../../../hooks/react-query/user/useUserInfoQuery'

interface Props {
  onPress?: () => void
  userId: string
  widthHeigth: number
}

const UserProfilePicture = (props: Props) => {
  const { data: userInfo } = useUserInfoQuery(props.userId)

  return (
    <img
      alt={userInfo?.username || 'loading-profile-picture'}
      width={props.widthHeigth}
      height={props.widthHeigth}
      style={{
        objectFit: 'cover',
        borderRadius: props.widthHeigth,
      }}
      src={
        userInfo?.profile?.pictureUrl ||
        'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png'
      }
    />
  )
}

export default memo(UserProfilePicture)
