import { Switch, Title, Tooltip, useMantineTheme } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { MdNotifications } from 'react-icons/md'
import { useSidebarMessageRoomsQuery } from '../../../hooks/react-query/message/useSidebarMessageRoomsQuery'
import { useUnreadMessageRoomsQuery } from '../../../hooks/react-query/message/useUnreadMessageRoomsQuery'
import { useMyColors } from '../../../hooks/useMyColors'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { base64ToUint8Array } from '../../NotificationsPage/base64ToUint8Array/base64ToUint8Array'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import BackButton from '../BackButton/BackButton'
import MessagesSidebarItem from './MessagesSidebarItem/MessagesSidebarItem'

const MessagesSidebar = () => {
  const { data: rooms } = useSidebarMessageRoomsQuery()
  const { roomId } = useMyRouterQuery()
  const { data: unreadRooms } = useUnreadMessageRoomsQuery()

  const [subscription, setSubscription] = useState<PushSubscription>()
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>()

  const axios = useAxios()
  const handleSubscribe = async () => {
    if (!registration) {
      console.log('no registration')
      return
    }

    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        String(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
      ),
    })
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub)
    await axios.post(urls.api.webPushSubscribe, {
      subscription: sub,
    })
    console.log('web push subscribed!')
    console.log(sub)
  }

  const handleUnsubscribe = async () => {
    if (!subscription) {
      console.log('no subscription')
      setSubscription(undefined)
      return
    }

    await subscription.unsubscribe()
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(undefined)
    console.log('web push unsubscribed!')
  }

  const checkSubscriptions = () => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      // @ts-expect-error
      window.workbox !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then(async (sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub)

            await axios.post(urls.api.webPushSubscribe, {
              subscription: sub,
            })
          }
        })

        setRegistration(reg)
      })
    }
  }

  useEffect(() => {
    checkSubscriptions()
  }, [])

  const pushNotificationsEnabled = useMemo(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission === 'granted' && !!subscription
    }
    return false
  }, [subscription, registration])

  const { isMobile } = useMyMediaQuery()
  const theme = useMantineTheme()
  const { mobileHeaderBg } = useMyColors()

  return (
    <FlexCol p={isMobile ? 0 : 16}>
      <FlexVCenter
        sx={
          isMobile
            ? {
                paddingLeft: 8,
                paddingRight: 16,
                paddingBlock: 8,
              }
            : undefined
        }
        justify={'space-between'}
        bg={isMobile ? mobileHeaderBg : undefined}
      >
        <FlexVCenter gap={4}>
          {isMobile && <BackButton />}

          <Title order={5}>Messages</Title>
        </FlexVCenter>
        {
          <Tooltip label="Push notifications">
            <Switch
              label={<MdNotifications size={18} />}
              onClick={() =>
                pushNotificationsEnabled
                  ? handleUnsubscribe()
                  : handleSubscribe()
              }
              checked={pushNotificationsEnabled}
            />
          </Tooltip>
        }
      </FlexVCenter>

      <FlexCol mt={8} p={isMobile ? 8 : 0}>
        {rooms?.map((room) => (
          <MessagesSidebarItem
            key={room.messages?.[0].id}
            room={room}
            isSelected={room.id === roomId}
            unread={unreadRooms?.some(
              (unreadRoom) => unreadRoom.id === room.id
            )}
          />
        ))}
      </FlexCol>
    </FlexCol>
  )
}

export default MessagesSidebar
