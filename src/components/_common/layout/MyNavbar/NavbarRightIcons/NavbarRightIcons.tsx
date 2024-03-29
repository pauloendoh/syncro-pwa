import { ActionIcon, Indicator, Tooltip, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { IoNotifications, IoNotificationsOutline } from 'react-icons/io5'
import { MdMail, MdMailOutline } from 'react-icons/md'
import { useUnreadMessageRoomsQuery } from '../../../../../hooks/react-query/message/useUnreadMessageRoomsQuery'
import { useNotificationsQuery } from '../../../../../hooks/react-query/notification/useNotificationsQuery'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import { urls } from '../../../../../utils/urls/urls'
import MyNextLink from '../../../overrides/MyNextLink'
import InstallButton from './InstallButton/InstallButton'

const NavbarRightIcons = () => {
  const { data: notifications } = useNotificationsQuery()

  const unseenNotifications = useMemo(
    () => notifications?.filter((n) => n.showDot) || [],
    [notifications]
  )

  const router = useRouter()
  const isPlannedItemsPage = useMemo(() => {
    return router.pathname.startsWith('/saved')
  }, [router.pathname])

  const isNotificationPage = useMemo(() => {
    return router.pathname.startsWith('/notifications')
  }, [router.pathname])

  const isMessagesPage = useMemo(() => {
    return router.pathname.startsWith('/messages')
  }, [router.pathname])

  const { isMobile } = useMyMediaQuery()

  const { data: unreadMessageRooms, isLoading } = useUnreadMessageRoomsQuery()

  const theme = useMantineTheme()

  return (
    <>
      <InstallButton />

      {isMobile && (
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
                {isMessagesPage ? (
                  <MdMail size={24} color={theme.colors.primary[9]} />
                ) : (
                  <MdMailOutline size={24} />
                )}
              </ActionIcon>
            </MyNextLink>
          </Indicator>
        </Tooltip>
      )}

      {isMobile && (
        <Tooltip label="Notifications">
          <Indicator
            disabled={!unseenNotifications || unseenNotifications.length === 0}
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
                {isNotificationPage ? (
                  <IoNotifications size={24} color={theme.colors.primary[9]} />
                ) : (
                  <IoNotificationsOutline size={24} />
                )}
              </ActionIcon>
            </MyNextLink>
          </Indicator>
        </Tooltip>
      )}
    </>
  )
}

export default NavbarRightIcons
