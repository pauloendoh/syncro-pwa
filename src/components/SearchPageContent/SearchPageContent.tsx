import { Box, Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import SearchBar from '../_common/layout/MyNavbar/SearchBar/SearchBar'
import ItemSearchResults from './ItemSearchResults/ItemSearchResults'
import UserSearchResults from './UserSearchResults/UserSearchResults'

type Props = {}

const SearchPageContent = (props: Props) => {
  const { q, type } = useMyRouterQuery()

  const router = useRouter()
  const { isXsScreen } = useMyMediaQuery()
  return (
    <LoggedLayout>
      <Container size="xs">
        {isXsScreen && (
          <FlexVCenter w="100%" mb={24}>
            <SearchBar autofocus />
          </FlexVCenter>
        )}

        <Box mt={16} />
        {type !== 'users' && !!q && !!type && (
          <ItemSearchResults query={q} type={type} />
        )}

        {type === 'users' && (
          <UserSearchResults onClickUser={() => {}} query={q} />
        )}
      </Container>
    </LoggedLayout>
  )
}

export default SearchPageContent
