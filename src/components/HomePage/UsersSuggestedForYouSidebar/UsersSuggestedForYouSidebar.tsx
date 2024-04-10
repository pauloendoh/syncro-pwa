import { Title } from '@mantine/core'
import { useUserRecommendationsForMeQuery } from '../../../hooks/react-query/item-recommendation/useUserRecommendationsForMeQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import UsersSuggestedForYouSidebarItem from './UsersSuggestedForYouSidebarItem/UsersSuggestedForYouSidebarItem'

type Props = {}

const UsersSuggestedForYouSidebar = ({ ...props }: Props) => {
  const { data, isLoading } = useUserRecommendationsForMeQuery()
  const { authUser } = useAuthStore()

  if (!authUser || (!isLoading && data?.length === 0)) {
    return null
  }

  return (
    <FlexCol className="SuggestedForYou" gap={16}>
      <Title order={6}>Suggested for you</Title>
      {isLoading && <CenterLoader width={160} />}

      <FlexCol gap={16}>
        {data?.slice(0, 4).map((item) => (
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
