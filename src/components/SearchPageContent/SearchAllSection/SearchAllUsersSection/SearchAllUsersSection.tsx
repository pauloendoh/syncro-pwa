import { Box, Flex, ScrollArea, Title, useMantineTheme } from '@mantine/core'
import { MdArrowRight } from 'react-icons/md'
import { useUserSearchQuery } from '../../../../hooks/react-query/search/useUserSearchQuery'
import { urls } from '../../../../utils/urls/urls'
import UserRecommendationCard from '../../../ExplorePageContent/RecommendedForYouSection/UserRecommendationCard/UserRecommendationCard'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import CenterLoader from '../../../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'

type Props = {
  query: string
}

const SearchAllUsersSection = ({ ...props }: Props) => {
  const theme = useMantineTheme()
  const { data, isLoading } = useUserSearchQuery(props.query)

  const users = data ?? []

  return (
    <FlexCol gap={8}>
      <FlexVCenter justify={'space-between'}>
        <FlexVCenter gap={8}>
          <Box
            sx={{
              width: 4,
              borderRadius: 1,
              height: 24,
              background: theme.colors.secondary[9],
            }}
          />
          <Title order={4}>Users</Title>
        </FlexVCenter>

        <MyNextLink
          href={urls.pages.search({
            q: props.query,
            type: 'users',
          })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: theme.colors.dark[2],
          }}
        >
          <Span
            sx={{
              color: theme.colors.dark[2],
              ':hover': {
                color: theme.colors.dark[1],
                textDecoration: 'underline',
              },
            }}
          >
            See all
          </Span>
          <MdArrowRight />
        </MyNextLink>
      </FlexVCenter>

      <ScrollArea
        h={192}
        styles={{
          root: isLoading
            ? {
                borderRadius: 8,
                border: `1px solid ${theme.colors.dark[5]}`,
              }
            : undefined,
        }}
      >
        <Flex gap={8}>
          {isLoading && <CenterLoader height={180} />}
          {!isLoading && !users.length && <Span>No users found</Span>}
          {!!users.length &&
            users.map((user) => (
              <UserRecommendationCard
                disableIgnoreButton
                key={user.id}
                user={user}
              />
            ))}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default SearchAllUsersSection
