import { useNewUsersQuery } from '../../../hooks/react-query/user/useNewUsersQuery'
import UserSearchItem from '../../SearchPageContent/UserSearchResults/UserSearchItem/UserSearchItem'
import FlexCol from '../../_common/flex/FlexCol'

interface Props {}

const NewUsersList = (props: Props) => {
  const { data: users, isLoading, refetch } = useNewUsersQuery()
  return (
    <FlexCol gap={16}>
      {users?.map((user) => (
        <UserSearchItem user={user} />
      ))}
    </FlexCol>
  )
}

export default NewUsersList
