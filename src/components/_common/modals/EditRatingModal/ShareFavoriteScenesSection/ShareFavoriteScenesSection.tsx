import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'

import { Flex, Text } from '@mantine/core'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdImage } from 'react-icons/md'
import { FavoriteSceneDto } from '../../../../../types/domain/rating/types/FavoriteSceneDto'
import { urls } from '../../../../../utils/urls'
import { useAxios } from '../../../../../utils/useAxios'
import FlexCol from '../../../flex/FlexCol'

type Props = {
  values: FavoriteSceneDto[]
  onChange: (values: FavoriteSceneDto[]) => void
}

const ShareFavoriteScenesSection = ({ ...props }: Props) => {
  const axios = useAxios()

  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post<string>(
      urls.api.uploadFavoriteScene,
      formData
    )

    props.onChange([
      ...props.values,
      {
        id: null,
        imageUrl: response.data,
        position: props.values.length + 1,
      },
    ])
  }

  const handleRemove = (imageUrl: string) => {
    props.onChange(props.values.filter((scene) => scene.imageUrl !== imageUrl))
  }

  return (
    <Flex gap={8} wrap="wrap">
      {props.values.map((scene, index) => (
        <div
          style={{
            position: 'relative',
          }}
        >
          <img
            key={scene.position}
            src={scene.imageUrl}
            style={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
          <IoMdCloseCircleOutline
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
            }}
            onClick={() => handleRemove(scene.imageUrl)}
          />
        </div>
      ))}
      <Dropzone
        multiple={false}
        onDrop={(files) => {
          console.log('dropped files', files)
          handleUpload(files[0])
        }}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        w={100}
        h={100}
        p={8}
      >
        <FlexCol align={'center'} gap={4} pt={8}>
          <MdImage />
          <Text inline size="sm" align="center">
            Share your favorite scenes
          </Text>
        </FlexCol>
      </Dropzone>
    </Flex>
  )
}

export default ShareFavoriteScenesSection
