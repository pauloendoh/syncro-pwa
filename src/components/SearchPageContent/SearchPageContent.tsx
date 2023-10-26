import { Box, Container, Grid } from '@mantine/core'
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
      <Grid>
        <Grid.Col sm={1} md={2} lg={1} xl={2} />
        <Grid.Col sm={8} md={7} lg={6}>
          <Container size="sm">
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
        </Grid.Col>
      </Grid>
    </LoggedLayout>
  )
}

export default SearchPageContent
