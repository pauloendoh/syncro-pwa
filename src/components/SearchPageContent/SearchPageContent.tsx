import { Box, Container } from '@mantine/core'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import SearchBar from '../_common/layout/MyNavbar/SearchBar/SearchBar'
import ItemSearchResults from './ItemSearchResults/ItemSearchResults'
import SearchAllSection from './SearchAllSection/SearchAllSection'
import UserSearchResults from './UserSearchResults/UserSearchResults'
import { isSyncroItemType } from './isSyncroItemType/isSyncroItemType'

type Props = {}

const SearchPageContent = (props: Props) => {
  const { q, type } = useMyRouterQuery()

  const { isMobile } = useMyMediaQuery()

  return (
    <LoggedLayout>
      <Container size="xs">
        {isMobile && (
          <FlexVCenter w="100%" mb={24}>
            <SearchBar />
          </FlexVCenter>
        )}
        <Box mt={16} />
        {!!q && isSyncroItemType(type) && (
          <ItemSearchResults query={q} type={type} />
        )}

        {!q && isSyncroItemType(type) && isMobile && (
          <>
            {/* <MobileSearchMostRated /> */}
            hello
          </>
        )}
        {type === 'users' && (
          <UserSearchResults onClickUser={() => {}} query={q} />
        )}
        {type === 'all' && <SearchAllSection q={q} />}
      </Container>
    </LoggedLayout>
  )
}

export default SearchPageContent
