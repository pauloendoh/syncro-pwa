import { Box, ScrollArea, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PhotoProvider, PhotoSlider, PhotoView } from 'react-photo-view'
import { useMangaPanelsQuery } from '../../../hooks/react-query/manga/useMangaPanelsQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'

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

  const {} = useMyRouterQuery()
  const router = useRouter()
  const queryParam = 'manga-panels-open'
  const [index, setIndex] = useState<null | number>(null)

  useEffect(() => {
    if (index !== null && ~index) {
      router.query[queryParam] = String(index)
      router.push(router, undefined, { scroll: false })
    }
  }, [index])

  const handleClose = () => {
    setIndex(null)
    router.query[queryParam] = undefined
    router.push(router, undefined, { scroll: false })
  }

  const queryValueRef = useRef(router?.query[queryParam])
  useEffect(() => {
    if (queryValueRef.current && !router?.query[queryParam]) {
      setIndex(null)
    }
    queryValueRef.current = router?.query[queryParam]
  }, [router.query[queryParam]])

  return (
    <FlexCol gap={8}>
      <Title order={4}>Manga Panels</Title>

      <Box mt={2}>
        {isLoading && <CenterLoader />}

        <PhotoSlider
          images={images.map((image) => ({
            src: image.uri,
            key: image.uri,
          }))}
          visible={index !== null && index >= 0}
          onClose={handleClose}
          index={index || 0}
          onIndexChange={setIndex}
          loop={false}
        />
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
            <img
              onClick={() => setIndex(index)}
              src={image.uri}
              height={100}
              width={100}
              alt={`${props.syncroItem.title} ${index}`}
              style={{
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          ))}
        </ScrollArea>

        {notFound && <Text>No panels found</Text>}
      </Box>
    </FlexCol>
  )
}

export default MangaPanelsSection