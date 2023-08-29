import { Box, LoadingOverlay, Text } from '@mantine/core'
import { ChangeEvent, createRef, useState } from 'react'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import { myNotifications } from '../../../../../utils/mantine/myNotifications'
import { urls } from '../../../../../utils/urls/urls'
import { useAxios } from '../../../../../utils/useAxios'
import FlexCol from '../../../flex/FlexCol'
import SyncroItemImage from '../../../image/SyncroItemImage/SyncroItemImage'

type Props = {
  item: SyncroItemDto
  onChangeImage: (newImageUrl: string) => void
}

const EditItemImageSection = (props: Props) => {
  const [loading, setLoading] = useState(false)

  const fileInput = createRef<HTMLInputElement>()

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      submitImage(file)
    }
  }

  const axios = useAxios()

  const submitImage = (file: File) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file, file.name)
    axios
      .post<string>(urls.api.syncroItemImage(props.item.id), formData)
      .then((res) => {
        props.onChangeImage(res.data)
        myNotifications.success('Image uploaded!')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <FlexCol align={'center'}>
      <Box pos="relative">
        <LoadingOverlay visible={loading} />
        <SyncroItemImage item={props.item} width={120} />
      </Box>
      <Text
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          if (fileInput?.current) {
            fileInput.current.click()
          }
        }}
      >
        Change Image
      </Text>
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={handleFileSelection}
        ref={fileInput}
      />
    </FlexCol>
  )
}

export default EditItemImageSection
