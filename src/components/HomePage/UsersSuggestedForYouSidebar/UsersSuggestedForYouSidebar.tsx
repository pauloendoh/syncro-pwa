import { Title } from '@mantine/core'
import { useUserRecommendationsForMeQuery } from '../../../hooks/react-query/item-recommendation/useUserRecommendationsForMeQuery'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import UsersSuggestedForYouSidebarItem from './UsersSuggestedForYouSidebarItem/UsersSuggestedForYouSidebarItem'

type Props = {}

const UsersSuggestedForYouSidebar = ({ ...props }: Props) => {
  const { data, isLoading } = useUserRecommendationsForMeQuery()

  return (
    <FlexCol className="SuggestedForYou" gap={16}>
      <Title order={6}>Suggested for you</Title>
      {isLoading && <CenterLoader width={160} />}

      <FlexCol gap={16}>
        {data?.map((item) => (
          <UsersSuggestedForYouSidebarItem
            user={item.userB}
            key={item.userB.id}
          />
        ))}
      </FlexCol>
    </FlexCol>
  )
}

export default UsersSuggestedForYouSidebar
