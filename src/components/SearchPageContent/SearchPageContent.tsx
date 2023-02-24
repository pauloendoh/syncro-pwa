import { Box, Container, Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { SearchParams } from '../../domains/search/types/SearchParams'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import { urls } from '../../utils/urls'
import LoggedLayout from '../_common/layout/LoggedLayout'
import ItemSearchResults from './ItemSearchResults/ItemSearchResults'
import { searchTabOptions } from './searchTabOptions/searchTabOptions'

type Props = {}

const SearchPageContent = (props: Props) => {
  const { q, type } = useMyRouterQuery()

  const router = useRouter()

  return (
    <LoggedLayout>
      <Container size="xs">
        <Tabs
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
        </Tabs>
      </Container>
    </LoggedLayout>
  )
}

export default SearchPageContent
