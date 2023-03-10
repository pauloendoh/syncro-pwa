import { ActionIcon, Indicator, Tooltip } from '@mantine/core'
import { useMemo } from 'react'
import { MdBookmark, MdNotifications } from 'react-icons/md'
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
    </>
  )
}

export default SavedAndNotificationIcons
