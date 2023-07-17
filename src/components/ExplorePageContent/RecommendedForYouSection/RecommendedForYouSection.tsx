import { useItemRecommendationsForMeQuery } from '../../../hooks/react-query/item-recommendation/useItemRecommendationsForMeQuery'
import { syncroItemTypes } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import RecommendedForYouByType from './RecommendedForYouByType/RecommendedForYouByType'

type Props = {}

const RecommendedForYouSection = ({ ...props }: Props) => {
  const { data } = useItemRecommendationsForMeQuery('movie')
  return (
    <FlexCol
      className="RecommendedForYouSection"
      sx={{
        gap: 16,
      }}
    >
      {syncroItemTypes.map((t) => (
        <RecommendedForYouByType key={t} type={t} />
      ))}
    </FlexCol>
  )
}

export default RecommendedForYouSection
