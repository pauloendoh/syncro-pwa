import { ActionIcon, Header, Indicator, Title, Tooltip } from '@mantine/core'
import { useMemo } from 'react'
import { IoMdCompass } from 'react-icons/io'
import { MdBookmark, MdNotifications } from 'react-icons/md'
import { useLogout } from '../../../../hooks/domains/auth/useLogout'
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

  const logout = useLogout()

  const { data: notifications, refetch } = useNotificationsQuery()

  const unseenNotifications = useMemo(
    () => notifications?.filter((n) => n.showDot) || [],
    [notifications]
  )

  const { isSmallScreen } = useMyMediaQuery()

  return (
    <Header
      height={60}
      px={32}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.dark[9],
        borderBottom: `1px solid ${theme.colors.dark[5]}`,
      })}
      fixed
    >
      {!isSmallScreen && (
        <MyNextLink href={urls.pages.index}>
          <Title
            sx={(theme) => ({
              color: theme.colors.dark[0],
            })}
            order={2}
          >
            Syncro
          </Title>
        </MyNextLink>
      )}
      <SearchBar />

      <FlexVCenter gap={24}>
        {authUser && (
          <FlexVCenter gap={24}>
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
    </Header>
  )
}

export default MyNavbar
