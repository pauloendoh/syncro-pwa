import { Box, Center, Loader, Title } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { useMemo } from 'react'
import ReactPlayer from 'react-player'
import { useYoutubeTrailersQuery } from '../../../hooks/react-query/youtube/useYoutubeTrailersQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'

type Props = {
  item: SyncroItemDto
}

const TrailerSection = (props: Props) => {
  const { data, isLoading } = useYoutubeTrailersQuery(props.item.id, {
    enabled: !!props.item.year,
  })
  const { width } = useViewportSize()

  const firstTrailer = useMemo(() => data?.[0], [data])

  return (
    <Box>
      <Title order={5}>Trailers</Title>
      <Box mt={8}>
        {isLoading && (
          <Center sx={{ height: 80 }}>
            <Loader />
          </Center>
        )}

        {firstTrailer && (
          <ReactPlayer url={firstTrailer} width={'100%'} controls={true} />
        )}

        {!isLoading && !firstTrailer && <Box>No trailers found</Box>}
      </Box>
    </Box>
  )
}

export default TrailerSection
