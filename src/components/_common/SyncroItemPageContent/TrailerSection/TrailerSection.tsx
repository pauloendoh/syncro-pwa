import { useViewportSize } from '@mantine/hooks'
import ReactPlayer from 'react-player'
import { useYoutubeTrailersQuery } from '../../../../hooks/react-query/youtube/useYoutubeTrailersQuery'

type Props = {
  itemId: string
}

const TrailerSection = (props: Props) => {
  const { data } = useYoutubeTrailersQuery(props.itemId)
  const { width } = useViewportSize()

  return (
    <div>
      <div>Trailers</div>
      <div>
        {data?.map((url) => (
          <div key={url}>
            <ReactPlayer url={url} width={width > 600 ? 600 : width - 24} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrailerSection
