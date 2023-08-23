import { Box, Flex, Title, useMantineTheme } from '@mantine/core'
import { MdArrowRight } from 'react-icons/md'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'
import { urls } from '../../../../utils/urls'
import UserRecommendationCard from '../../../ExplorePageContent/RecommendedForYouSection/UserRecommendationCard/UserRecommendationCard'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'

type Props = {
  users: UserSimpleDto[]
  query: string
}

const SearchAllUsersSection = ({ ...props }: Props) => {
  const theme = useMantineTheme()
  const { isMobile } = useMyMediaQuery()
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
          <Title order={4}>
            Users
            {/* <MyNextLink
          href={urls.pages.search({
            q: props.q,
            type: props.type,
          })}
          style={{
            fontSize: 14,
            fontWeight: 400,
            marginLeft: 8,
          }}
        >
          <MyTextLink>See all</MyTextLink>
        </MyNextLink> */}
          </Title>
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

      {!!props.users.length && (
        <Flex gap={8} wrap="wrap">
          {props.users.slice(0, 6).map((item) => (
            <UserRecommendationCard user={item} />
          ))}
        </Flex>
      )}
    </FlexCol>
  )
}

export default SearchAllUsersSection
