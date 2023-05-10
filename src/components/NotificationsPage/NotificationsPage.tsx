import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import useHideNotificationDotsMutation from '../../hooks/react-query/notification/useHideNotificationDotsMutation'
import { useNotificationsQuery } from '../../hooks/react-query/notification/useNotificationsQuery'
import { urls } from '../../utils/urls'
import { useAxios } from '../../utils/useAxios'
import FlexCol from '../_common/flex/FlexCol'
import LoggedLayout from '../_common/layout/LoggedLayout'
import FollowNotificationItem from './FollowNotificationItem/FollowNotificationItem'
import ItemRecommendationNotificationItem from './ItemRecommendationNotificationItem/ItemRecommendationNotificationItem'
import RatingImportRequestNotificationItem from './RatingImportRequestNotificationItem/RatingImportRequestNotificationItem'
import { base64ToUint8Array } from './base64ToUint8Array/base64ToUint8Array'

const NotificationsPage = () => {
  const { data: notifications } = useNotificationsQuery()

  const { mutate: submitHideDots } = useHideNotificationDotsMutation()

  const router = useRouter()

  const [subscription, setSubscription] = useState<PushSubscription>()
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>()

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

  const subscribeButtonOnClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    debugger
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

  const unsubscribeButtonOnClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!subscription) {
      console.log('no subscription')
      return
    }

    await subscription.unsubscribe()
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(undefined)
    console.log('web push unsubscribed!')
  }

  useEffect(() => {
    checkSubscriptions()
    const exitingFunction = () => {
      submitHideDots()
    }
    router.events.on('routeChangeStart', exitingFunction)

    return () => {
      console.log('unmounting component...')
      router.events.off('routeChangeStart', exitingFunction)
    }
  }, [])

  const sortedNotifications = useMemo(
    () =>
      notifications?.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) ||
      [],
    [notifications]
  )

  const axios = useAxios()
  const sendNotificationButtonOnClick = async () => {
    if (subscription == null) {
      console.error('web push not subscribed')
      return
    }

    await axios.post(urls.api.webPushSubscribe, {
      subscription,
    })
  }

  return (
    <LoggedLayout>
      <button onClick={subscribeButtonOnClick} disabled={Boolean(subscription)}>
        Subscribe
      </button>
      <button
        onClick={unsubscribeButtonOnClick}
        disabled={!Boolean(subscription)}
      >
        Unsubscribe
      </button>
      <button
        onClick={sendNotificationButtonOnClick}
        disabled={!Boolean(subscription)}
      >
        Send Notification
      </button>

      <Container size="xs">
        <FlexCol gap={24}>
          {sortedNotifications.map((n) => {
            if (n.follow)
              return (
                <FollowNotificationItem follow={n.follow} showDot={n.showDot} />
              )
            if (n.itemRecommendation)
              return (
                <ItemRecommendationNotificationItem
                  itemRecommendation={n.itemRecommendation}
                  showDot={n.showDot}
                />
              )

            if (n.ratingsImportRequest) {
              return (
                <RatingImportRequestNotificationItem
                  importRequest={n.ratingsImportRequest}
                  showDot={n.showDot}
                />
              )
            }

            return null
          })}
        </FlexCol>
      </Container>
    </LoggedLayout>
  )
}

export default NotificationsPage
