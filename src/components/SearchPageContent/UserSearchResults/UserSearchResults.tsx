import { useTheme } from '@emotion/react'
import { Text } from '@mantine/core'
import { useMemo } from 'react'
import { useUserSearchQuery } from '../../../hooks/react-query/search/useUserSearchQuery'
import { UserSimpleDto } from '../../../types/domain/user/UserSimpleDto'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import UserSearchItem from './UserSearchItem/UserSearchItem'

interface Props {
  query: string
  onClickUser: (user: UserSimpleDto) => void
}

const UserSearchResults = (props: Props) => {
  const { data: users, refetch, isLoading } = useUserSearchQuery(props.query)

  // useFocusEffect(() => {
  //   refetch()
  // })

  const noResults = useMemo(
    () => !isLoading && users?.length === 0,
    [isLoading, users]
  )

  const theme = useTheme()
  return (
    <FlexCol mt={16} gap={16}>
      {isLoading && <CenterLoader />}

      {noResults ? (
        <Text>No users found :(</Text>
      ) : (
        users?.map((user) => (
          <UserSearchItem
            key={user.id}
            user={user}
            onClickUser={props.onClickUser}
          />
        ))
      )}
    </FlexCol>
  )
}

export default UserSearchResults
