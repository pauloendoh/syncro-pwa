import { useMostFollowedUsersQuery } from '../../../hooks/react-query/follow/useMostFollowedUsersQuery'
import UserSearchItem from '../../SearchPageContent/UserSearchResults/UserSearchItem/UserSearchItem'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'

interface Props {}

const PopularUserList = (props: Props) => {
  const { data: users, isLoading, refetch } = useMostFollowedUsersQuery()

  if (isLoading) return <CenterLoader />

  return (
    <FlexCol gap={16}>
      {users?.map((user) => (
        <UserSearchItem user={user} />
      ))}
    </FlexCol>
  )
}

export default PopularUserList
