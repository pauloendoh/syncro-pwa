import { Flex } from '@mantine/core'
import { useMemo } from 'react'
import { PhotoSlider } from 'react-photo-view'
import { useQueryParams } from '../../../../hooks/useQueryParams'
import { FavoriteSceneDto } from '../../../../types/domain/rating/types/FavoriteSceneDto'
import MyNextImage300 from '../../../_common/image/MyNextImage300/MyNextImage300'

type Props = {
  scenes: FavoriteSceneDto[]
}

const FavoriteScenesSection = ({ ...props }: Props) => {
  const images = useMemo(
    () =>
      props.scenes.map((scene) => ({
        uri: scene.imageUrl,
      })),
    [props.scenes]
  )

  const { setQuery, queryValue, removeQuery } = useQueryParams().favoriteScene

  const handleClose = () => {
    removeQuery()
  }

  const index = useMemo(() => {
    return props.scenes.findIndex((scene) => scene.id === queryValue)
  }, [queryValue, props.scenes])

  if (props.scenes.length === 0) {
    return null
  }

  return (
    <Flex className="FavoriteScenesSection" wrap="wrap" gap={8} mb={16}>
      <PhotoSlider
        images={images.map((image) => ({
          src: image.uri,
          key: image.uri,
        }))}
        visible={index >= 0}
        onClose={handleClose}
        index={index >= 0 ? index : 0}
        onIndexChange={(index) => {
          console.log('changing index')
          setQuery(props.scenes[index].id!, { replace: true })
        }}
        loop={false}
      />

      {props.scenes.map((scene, index) => (
        <MyNextImage300
          alt={`favorite-scene-${index}`}
          key={index}
          src={scene.imageUrl}
          style={{
            width: 64,
            height: 64,
            objectFit: 'cover',
            borderRadius: 4,
            cursor: 'pointer',
          }}
          onClick={() => setQuery(scene.id!, { scroll: false })}
        />
      ))}
    </Flex>
  )
}

export default FavoriteScenesSection
