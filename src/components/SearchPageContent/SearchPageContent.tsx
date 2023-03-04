import { Box, Container, Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import { SearchParams } from '../../types/domain/search/SearchParams'
import { urls } from '../../utils/urls'
import LoggedLayout from '../_common/layout/LoggedLayout'
import ItemSearchResults from './ItemSearchResults/ItemSearchResults'
import { searchTabOptions } from './searchTabOptions/searchTabOptions'
import UserSearchResults from './UserSearchResults/UserSearchResults'

type Props = {}

const SearchPageContent = (props: Props) => {
  const { q, type } = useMyRouterQuery()

  const router = useRouter()

  return (
    <LoggedLayout>
      <Container size="xs">
        <Tabs
          styles={{
            tabsList: {
              overflowY: 'auto',
              flexWrap: 'unset',
              paddingBottom: 6,
              borderBottom: 'none',
            },
          }}
          value={type}
          onTabChange={(newTabValue) => {
            router.push(
              urls.pages.search({
                q: q || '',
                type: newTabValue as SearchParams['type'],
              })
            )
          }}
        >
          <Tabs.List>
            {searchTabOptions.map((option) => (
              <Tabs.Tab key={option.key} value={option.key}>
                {option.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Box mt={16} />
          {type !== 'users' && !!q && !!type && (
            <ItemSearchResults query={q} type={type} />
          )}

          {type === 'users' && (
            <UserSearchResults onClickUser={() => {}} query={q} />
          )}
        </Tabs>
      </Container>
    </LoggedLayout>
  )
}

export default SearchPageContent
