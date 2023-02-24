import Image from 'next/image'

type Props = {
  username?: string
  pictureUrl?: string
  widthHeight?: number
}

const UserImage = (props: Props) => {
  return (
    <Image
      alt={props.username || 'username'}
      src={props.pictureUrl || '/images/avatars/avatar.png'}
      width={props.widthHeight || 40}
      height={props.widthHeight || 40}
      style={{
        borderRadius: '50%',
      }}
    />
  )
}

export default UserImage
