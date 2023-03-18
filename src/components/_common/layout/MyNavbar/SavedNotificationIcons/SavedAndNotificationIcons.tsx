import { ActionIcon, Indicator, Tooltip } from '@mantine/core'
import { useMemo } from 'react'
import { IoBookmarksOutline, IoNotificationsOutline } from 'react-icons/io5'
import { useNotificationsQuery } from '../../../../../hooks/react-query/notification/useNotificationsQuery'
import { urls } from '../../../../../utils/urls'
import MyNextLink from '../../../overrides/MyNextLink'

type Props = {}

const SavedAndNotificationIcons = (props: Props) => {
  const { data: notifications } = useNotificationsQuery()

  const unseenNotifications = useMemo(
    () => notifications?.filter((n) => n.showDot) || [],
    [notifications]
  )

  return (
    <>
      <Tooltip label="Planned items" withArrow>
        <div>
          <MyNextLink href={urls.pages.savedItems('all')}>
            <ActionIcon>
              <IoBookmarksOutline size={24} />
            </ActionIcon>
          </MyNextLink>
        </div>
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
              <IoNotificationsOutline size={24} />
            </ActionIcon>
          </MyNextLink>
        </Indicator>
      </Tooltip>
    </>
  )
}

export default SavedAndNotificationIcons
