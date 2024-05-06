import { Box, Container, ScrollArea, Tabs, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { ExploreSlug, useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import { urls } from '../../utils/urls/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import DefaultLayout from '../_common/layout/DefaultLayout'
import BrowseItemsExploreSection from './BrowseItemsExploreSection/BrowseItemsExploreSection'
import NewUsersList from './NewUsersList/NewUsersList'
import PopularUserList from './PopularUserList/PopularUserList'
import RatingSimilarityList from './RatingSimilarityList/RatingSimilarityList'
import RecommendedForYouSection from './RecommendedForYouSection/RecommendedForYouSection'
import { exploreTabOptions } from './exploreTabOptions/exploreTabOptions'

type Props = {}

const ExplorePageContent = (props: Props) => {
  const { q, exploreSlug } = useMyRouterQuery()

  const router = useRouter()

  return (
    <DefaultLayout>
      <Container>
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
            router.push(urls.pages.explore(newTabValue as ExploreSlug))
          }}
        >
          <ScrollArea pb={8}>
            <Tabs.List>
              {exploreTabOptions.map((option) => (
                <Tabs.Tab
                  key={option.key}
                  value={option.key}
                  sx={{
                    '&:first-child': {
                      paddingLeft: 0,
                    },
                  }}
                >
                  {option.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </ScrollArea>

          <Box mt={8} />
          {exploreSlug === 'for-you' && <RecommendedForYouSection />}
          {exploreSlug === 'browse' && <BrowseItemsExploreSection />}
          {exploreSlug === 'popular-users' && <PopularUserList />}
          {exploreSlug === 'rating-similarity' && <RatingSimilarityList />}
          {exploreSlug === 'new-users' && <NewUsersList />}
        </Tabs>
      </Container>
    </DefaultLayout>
  )
}

export default ExplorePageContent
