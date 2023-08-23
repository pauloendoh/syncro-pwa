import { Flex, ScrollArea, Title } from '@mantine/core'
import { useUserRecommendationsForMeQuery } from '../../../hooks/react-query/item-recommendation/useUserRecommendationsForMeQuery'
import { syncroItemTypes } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import Span from '../../_common/text/Span'
import RecommendedForYouByType from './RecommendedForYouByType/RecommendedForYouByType'
import UserRecommendationCard from './UserRecommendationCard/UserRecommendationCard'

type Props = {}

const RecommendedForYouSection = ({ ...props }: Props) => {
  const { data, isLoading } = useUserRecommendationsForMeQuery()
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

      <FlexCol gap={16}>
        <Title order={5}>Users</Title>
        <ScrollArea pb={16}>
          <Flex gap={8}>
            {isLoading && <CenterLoader height={133} width="100%" />}
            {data?.map((item) => (
              <UserRecommendationCard user={item.userB} key={item.userB.id} />
            ))}
            {data?.length === 0 && <Span>No recommendations for you yet</Span>}
          </Flex>
        </ScrollArea>
      </FlexCol>
    </FlexCol>
  )
}

export default RecommendedForYouSection
