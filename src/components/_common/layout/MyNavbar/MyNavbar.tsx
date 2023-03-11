import {
  ActionIcon,
  Container,
  Grid,
  Header,
  Indicator,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { useMemo } from 'react'
import { IoMdCompass } from 'react-icons/io'
import { MdBookmark, MdHome, MdNotifications } from 'react-icons/md'
import { useNotificationsQuery } from '../../../../hooks/react-query/notification/useNotificationsQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../utils/urls'
import FlexVCenter from '../../flex/FlexVCenter'
import MyNextLink from '../../overrides/MyNextLink'
import NavbarUserMenu from './NavbarUserMenu/NavbarUserMenu'
import SearchBar from './SearchBar/SearchBar'

type Props = {}

const MyNavbar = (props: Props) => {
  const { authUser } = useAuthStore()

  const { data: notifications } = useNotificationsQuery()

  const unseenNotifications = useMemo(
    () => notifications?.filter((n) => n.showDot) || [],
    [notifications]
  )

  const { isSmallScreen } = useMyMediaQuery()

  const theme = useMantineTheme()

  return (
    <Header
      height={60}
      fixed
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid
        sx={{
          width: '100%',
        }}
        align="center"
      >
        <Grid.Col span={2} xs={2} sm={'auto'} md={'auto'}>
          <MyNextLink
            href={urls.pages.index}
            style={{
              color: theme.colors.dark[0],
            }}
          >
            <FlexVCenter
              sx={{
                paddingLeft: isSmallScreen ? 16 : 32,
              }}
            >
              {isSmallScreen ? (
                <ActionIcon>
                  <MdHome size={24} />
                </ActionIcon>
              ) : (
                <Title
                  sx={(theme) => ({
                    color: theme.colors.dark[0],
                  })}
                  order={2}
                >
                  Syncro
                </Title>
              )}
            </FlexVCenter>
          </MyNextLink>
        </Grid.Col>
        <Grid.Col span={4} xs={5} sm={6} md={6}>
          <Container size="xs" px={0}>
            <SearchBar />
          </Container>
        </Grid.Col>
        <Grid.Col span={6} xs={'auto'} sm={'auto'} md={'auto'}>
          <FlexVCenter gap={isSmallScreen ? 16 : 24} justify="flex-end">
            {authUser && (
              <FlexVCenter gap={isSmallScreen ? 16 : 24}>
                <Tooltip label="Explore" withArrow>
                  <MyNextLink href={urls.pages.explore('popular-users')}>
                    <ActionIcon>
                      <IoMdCompass size={24} />
                    </ActionIcon>
                  </MyNextLink>
                </Tooltip>

                <Tooltip label="Saved items" withArrow>
                  <MyNextLink href={urls.pages.savedItems('all')}>
                    <ActionIcon>
                      <MdBookmark size={24} />
                    </ActionIcon>
                  </MyNextLink>
                </Tooltip>

                <Tooltip label="Notifications" withArrow>
                  <Indicator
                    disabled={unseenNotifications.length === 0}
                    label={
                      unseenNotifications.length > 0
                        ? unseenNotifications.length
                        : undefined
                    }
                    size={16}
                  >
                    <MyNextLink href={urls.pages.notifications}>
                      <ActionIcon>
                        <MdNotifications size={24} />
                      </ActionIcon>
                    </MyNextLink>
                  </Indicator>
                </Tooltip>
              </FlexVCenter>
            )}

            <NavbarUserMenu />
          </FlexVCenter>
        </Grid.Col>
      </Grid>
    </Header>
  )
}

export default MyNavbar
