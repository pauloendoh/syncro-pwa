import { ActionIcon, Indicator, Tooltip, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import {
  IoBookmarks,
  IoBookmarksOutline,
  IoNotifications,
  IoNotificationsOutline,
} from 'react-icons/io5'
import { MdMail, MdMailOutline } from 'react-icons/md'
import { useUnreadMessageRoomsQuery } from '../../../../../hooks/react-query/message/useUnreadMessageRoomsQuery'
import { useNotificationsQuery } from '../../../../../hooks/react-query/notification/useNotificationsQuery'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import { urls } from '../../../../../utils/urls'
import MyNextLink from '../../../overrides/MyNextLink'

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
      {isMobile && (
        <Tooltip label="Planned items" withArrow>
          <div>
            <MyNextLink href={urls.pages.savedItems()}>
              <ActionIcon>
                {isPlannedItemsPage ? (
                  <IoBookmarks size={24} color={theme.colors.primary[9]} />
                ) : (
                  <IoBookmarksOutline size={24} />
                )}
              </ActionIcon>
            </MyNextLink>
          </div>
        </Tooltip>
      )}

      <Tooltip
        label={
          unreadMessageRooms && unreadMessageRooms.length > 0
            ? 'Messages'
            : 'No messages'
        }
        withArrow
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

      <Tooltip label="Notifications" withArrow>
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
    </>
  )
}

export default NavbarRightIcons
