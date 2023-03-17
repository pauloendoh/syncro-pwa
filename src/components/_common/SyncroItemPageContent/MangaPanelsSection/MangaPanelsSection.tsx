import { Box, ScrollArea, Text, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { useMangaPanelsQuery } from '../../../../hooks/react-query/manga/useMangaPanelsQuery'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../flex/FlexCol'
import CenterLoader from '../../overrides/CenterLoader/CenterLoader'

type Props = {
  syncroItem: SyncroItemDto
}

const MangaPanelsSection = (props: Props) => {
  const { data, isLoading } = useMangaPanelsQuery(props.syncroItem.id)

  const notFound = useMemo(() => !isLoading && !data?.[0], [isLoading, data])

  const images = useMemo(
    () =>
      data?.map((data) => ({
        uri: data,
      })) || [],
    [data]
  )

  const [visible, setIsVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <FlexCol gap={8}>
      <Title order={4}>Manga Panels</Title>

      <Box mt={2}>
        {isLoading && <CenterLoader />}

        <PhotoProvider loop={images.length}>
          <ScrollArea
            sx={{
              div: {
                display: 'flex !important',
                gap: 16,
              },
              paddingBottom: 16,
            }}
          >
            {images.map((image, index) => (
              <PhotoView src={image.uri}>
                <img
                  src={image.uri}
                  height={100}
                  width={100}
                  alt={`${props.syncroItem.title} ${index}`}
                  style={{
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                />
              </PhotoView>
            ))}
          </ScrollArea>
        </PhotoProvider>

        {notFound && <Text>No panels found</Text>}
      </Box>
    </FlexCol>
  )
}

export default MangaPanelsSection
