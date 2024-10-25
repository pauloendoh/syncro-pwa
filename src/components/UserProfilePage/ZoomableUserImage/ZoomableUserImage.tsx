import { useEffect } from 'react'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { usePhotoSliderStoreV2 } from '../../../hooks/zustand/usePhotoSliderStore'
import { UserSimpleDto } from '../../../types/domain/user/UserSimpleDto'
import { PressableDivButton } from '../../_common/flex/PressableDivButton/PressableDivButton'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'

type Props = {
  userInfo: UserSimpleDto
}

const ZoomableUserImage = ({ userInfo, ...props }: Props) => {
  const { isSmallScreen } = useMyMediaQuery()
  const [queryValue] = useQueryParams().profileImage

  const { openPhotosSlider } = usePhotoSliderStoreV2({
    openPhotosSlider: true,
  })

  useEffect(() => {
    if (queryValue) {
      handleOpen()
    }
  }, [])

  const handleOpen = () => {
    openPhotosSlider({
      images: [
        {
          key: userInfo.id,
          src: userInfo.profile.pictureUrl,
        },
      ],
      queryParams: {
        key: 'profileImage',
        value: 'true',
      },
    })
  }

  return (
    <PressableDivButton
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        handleOpen()
      }}
    >
      <UserImage
        key={userInfo.id}
        pictureUrl={userInfo.profile.pictureUrl}
        username={userInfo.username}
        widthHeight={isSmallScreen ? 80 : 96}
      />
    </PressableDivButton>
  )
}

export default ZoomableUserImage
