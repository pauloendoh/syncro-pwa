import { Box, LoadingOverlay, Text } from '@mantine/core'
import { ChangeEvent, createRef, useState } from 'react'
import { useUserInfoQuery } from '../../../hooks/react-query/user/useUserInfoQuery'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import FlexCol from '../../_common/flex/FlexCol'

interface Props {
  userId: string
  imageIsPressable?: boolean
}

const ChangeProfileImageSection = (props: Props) => {
  const { data: userInfo, refetch } = useUserInfoQuery(props.userId)

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const axios = useAxios()

  const [loading, setLoading] = useState(false)
  const handleFileUpload = (file: File) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file, file.name)
    axios
      .put<AuthUserGetDto>(urls.api.profilePicture, formData)
      .then((res) => {
        myNotifications.success('Image uploaded!')

        refetch()
      })
      .finally(() => {
        setLoading(false)
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
      gap={4}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Box pos="relative">
        <LoadingOverlay visible={loading} />
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
      </Box>

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

export default ChangeProfileImageSection
