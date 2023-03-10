import { Box, Container, Tabs, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { ExploreSlug, useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import { urls } from '../../utils/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import { exploreTabOptions } from './exploreTabOptions/exploreTabOptions'
import NewUsersList from './NewUsersList/NewUsersList'
import PopularUserList from './PopularUserList/PopularUserList'
import SimilarUserList from './SimilarUserList/SimilarUserList'

type Props = {}

const ExplorePageContent = (props: Props) => {
  const { q, exploreSlug } = useMyRouterQuery()

  const router = useRouter()

  return (
    <LoggedLayout>
      <Container size="xs">
        <FlexVCenter>
          <Title order={2}>Explore</Title>
        </FlexVCenter>

        <Box mt={24} />
        <Tabs
          styles={{
            tabsList: {
              overflowY: 'auto',
              flexWrap: 'unset',
              paddingBottom: 6,
              borderBottom: 'none',
            },
          }}
          value={exploreSlug}
          onTabChange={(newTabValue) => {
            console.log({
              newTabValue,
            })
            router.push(urls.pages.explore(newTabValue as ExploreSlug))
          }}
        >
          <Tabs.List>
            {exploreTabOptions.map((option) => (
              <Tabs.Tab key={option.key} value={option.key}>
                {option.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Box mt={16} />
          {exploreSlug === 'popular-users' && <PopularUserList />}
          {exploreSlug === 'rating-similarity' && <SimilarUserList />}
          {exploreSlug === 'new-users' && <NewUsersList />}
        </Tabs>
      </Container>
    </LoggedLayout>
  )
}

export default ExplorePageContent
