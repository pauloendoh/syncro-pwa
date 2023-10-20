import { useNewUsersQuery } from '../../../hooks/react-query/user/useNewUsersQuery'
import UserSearchItem from '../../SearchPageContent/UserSearchResults/UserSearchItem/UserSearchItem'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'

interface Props {}

const NewUsersList = (props: Props) => {
  const { data: users, isLoading, refetch } = useNewUsersQuery()

  if (isLoading) return <CenterLoader />

  return (
    <FlexCol gap={16} maw={500}>
      {users?.map((user) => (
        <UserSearchItem user={user} />
      ))}
    </FlexCol>
  )
}

export default NewUsersList
