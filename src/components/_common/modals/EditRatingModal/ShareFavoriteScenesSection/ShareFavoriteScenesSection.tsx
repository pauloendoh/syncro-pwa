import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'

import { Flex, Text } from '@mantine/core'
import { useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdImage } from 'react-icons/md'
import { FavoriteSceneDto } from '../../../../../types/domain/rating/types/FavoriteSceneDto'
import { urls } from '../../../../../utils/urls/urls'
import { useAxios } from '../../../../../utils/useAxios'
import FlexCol from '../../../flex/FlexCol'

type Props = {
  values: FavoriteSceneDto[]
  onChange: (values: FavoriteSceneDto[]) => void
}

const ShareFavoriteScenesSection = ({ ...props }: Props) => {
  const axios = useAxios()

  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = async (file: File) => {
    if (isLoading) {
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setIsLoading(true)

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

    setIsLoading(false)
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
          handleUpload(files[0])
        }}
        maxSize={3 * 1024 ** 2}
        onReject={() => {
          alert(`File is too large, max size is 3mb`)
        }}
        accept={IMAGE_MIME_TYPE}
        w={100}
        h={100}
        p={8}
        loading={isLoading}
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
