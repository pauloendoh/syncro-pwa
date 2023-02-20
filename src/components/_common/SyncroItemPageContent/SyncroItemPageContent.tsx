import { useSyncroItemDetailsQuery } from '../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import TrailerSection from './TrailerSection/TrailerSection'

type Props = {}

const SyncroItemPageContent = (props: Props) => {
  const { syncroItemId } = useMyRouterQuery()
  const { data: item } = useSyncroItemDetailsQuery(syncroItemId)
  const isMovieOrSeries = item?.type === 'tvSeries' || item?.type === 'movie'

  return (
    <div>
      syncroItem id : {syncroItemId}
      {isMovieOrSeries && <TrailerSection itemId={syncroItemId!} />}
    </div>
  )
}

export default SyncroItemPageContent
