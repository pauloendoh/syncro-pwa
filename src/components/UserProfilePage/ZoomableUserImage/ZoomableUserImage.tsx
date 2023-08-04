import { PhotoSlider } from 'react-photo-view'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { UserSimpleDto } from '../../../types/domain/user/UserSimpleDto'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'

type Props = {
  userInfo: UserSimpleDto
}

const ZoomableUserImage = ({ userInfo, ...props }: Props) => {
  const { isSmallScreen } = useMyMediaQuery()
  const { queryValue, removeQuery, setQuery } = useQueryParams().profileImage
  return (
    <>
      <PhotoSlider
        images={[
          {
            key: userInfo.id,
            src: userInfo.profile.pictureUrl,
          },
        ]}
        visible={!!queryValue}
        onClose={() => {
          removeQuery({ backTwice: true })
        }}
      />
      <div
        style={{
          cursor: 'pointer',
        }}
        onClick={() => {
          setQuery(userInfo.id)
        }}
      >
        <UserImage
          pictureUrl={userInfo.profile.pictureUrl}
          username={userInfo.username}
          widthHeight={isSmallScreen ? 80 : 96}
        />
      </div>
    </>
  )
}

export default ZoomableUserImage
