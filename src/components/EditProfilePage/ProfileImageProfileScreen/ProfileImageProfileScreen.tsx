import { Box, Text } from '@mantine/core'
import { ChangeEvent, createRef } from 'react'
import { useUserInfoQuery } from '../../../hooks/react-query/user/useUserInfoQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import FlexCol from '../../_common/flex/FlexCol'

interface Props {
  userId: string
  imageIsPressable?: boolean
}

// PE 1/3 - rename to ChangeProfileImage
const ProfileImageProfileScreen = (props: Props) => {
  const authUser = useAuthStore((s) => s.authUser)

  const { data: userInfo, refetch } = useUserInfoQuery(props.userId)

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const axios = useAxios()

  const handleFileUpload = (file: File) => {
    const formData = new FormData()
    formData.append('file', file, file.name)

    axios.put<AuthUserGetDto>(urls.api.profilePicture, formData).then((res) => {
      myNotifications.success('Image uploaded!')

      refetch()
    })
  }

  const fileInput = createRef<HTMLInputElement>()

  return (
    <FlexCol
      onClick={() => {
        if (fileInput?.current) {
          fileInput.current.click()
        }
      }}
      align="center"
      sx={{
        cursor: 'pointer',
      }}
    >
      <img
        alt="profile-picture"
        src={
          userInfo?.profile?.pictureUrl ||
          'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png'
        }
        height={80}
        width={80}
        style={{ borderRadius: 100, objectFit: 'cover' }}
      />

      <Text>Change profile image</Text>

      <Box>
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={handleFileSelection}
          ref={fileInput}
        />
      </Box>
    </FlexCol>
  )
}

export default ProfileImageProfileScreen
