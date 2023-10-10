import { ActionIcon, Indicator, Tooltip, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import {
  IoCompass,
  IoCompassOutline,
  IoNotifications,
  IoNotificationsOutline,
} from 'react-icons/io5'
import { MdHome, MdMail, MdMailOutline, MdOutlineHome } from 'react-icons/md'
import { useUnreadMessageRoomsQuery } from '../../../../../hooks/react-query/message/useUnreadMessageRoomsQuery'
import { useNotificationsQuery } from '../../../../../hooks/react-query/notification/useNotificationsQuery'
import { useUserInfoQuery } from '../../../../../hooks/react-query/user/useUserInfoQuery'
import useAuthStore from '../../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../../utils/urls/urls'
import MyNextLink from '../../../overrides/MyNextLink'
import NavbarUserMenu from '../../MyNavbar/NavbarUserMenu/NavbarUserMenu'

export const useSidebarLinks = () => {
  const router = useRouter()
  const theme = useMantineTheme()

  const { data: unreadMessageRooms, isLoading } = useUnreadMessageRoomsQuery()
  const { authUser } = useAuthStore()
  const { data: userInfo } = useUserInfoQuery(authUser?.id || '')

  const { data: notifications } = useNotificationsQuery()

  const unseenNotifications = useMemo(
    () => notifications?.filter((n) => n.showDot) || [],
    [notifications]
  )

  const sidebarLinks = useMemo(() => {
    return [
      {
        href: urls.pages.index,
        text: 'Home',
        Icon: () =>
          router.asPath === urls.pages.index ? (
            <MdHome size={32} color={theme.colors.primary[9]} />
          ) : (
            <MdOutlineHome size={32} />
          ),
      },
      {
        href: urls.pages.notifications,
        text: 'Notifications',
        Icon: () => (
          <Tooltip label="Notifications">
            <Indicator
              disabled={
                !unseenNotifications || unseenNotifications.length === 0
              }
              color="red"
              label={
                unseenNotifications.length > 0
                  ? unseenNotifications.length
                  : undefined
              }
              size={16}
            >
              <MyNextLink href={urls.pages.notifications}>
                <ActionIcon>
                  {router.pathname.startsWith('/notifications') ? (
                    <IoNotifications
                      size={24}
                      color={theme.colors.primary[9]}
                    />
                  ) : (
                    <IoNotificationsOutline size={24} />
                  )}
                </ActionIcon>
              </MyNextLink>
            </Indicator>
          </Tooltip>
        ),
      },
      {
        href: urls.pages.explore(),
        text: 'Explore',
        Icon: () =>
          router.asPath.startsWith('/explore') ? (
            <IoCompass size={32} color={theme.colors.primary[9]} />
          ) : (
            <IoCompassOutline size={32} />
          ),
      },
      {
        href: urls.pages.messagesIndex,
        text: 'Messages',
        Icon: () => (
          <Tooltip
            label={
              unreadMessageRooms && unreadMessageRooms.length > 0
                ? 'Messages'
                : 'No messages'
            }
          >
            <Indicator
              disabled={isLoading || unreadMessageRooms?.length === 0}
              label={unreadMessageRooms?.length || 0}
              size={16}
              color="red"
            >
              <MyNextLink href={urls.pages.messagesIndex}>
                <ActionIcon>
                  {router.asPath.startsWith('/messages') ? (
                    <MdMail size={32} color={theme.colors.primary[9]} />
                  ) : (
                    <MdMailOutline size={32} />
                  )}
                </ActionIcon>
              </MyNextLink>
            </Indicator>
          </Tooltip>
        ),
      },
      {
        href: '#',
        text: <NavbarUserMenu useUsername={authUser?.username} />,
        Icon: () => (
          <NavbarUserMenu
            isActive={router.asPath.includes(
              urls.pages.userProfile(authUser?.id || '')
            )}
            size={32}
          />
        ),
      },
    ]
  }, [
    router.asPath,
    unreadMessageRooms?.length,
    isLoading,
    unseenNotifications,
  ])

  return sidebarLinks
}
