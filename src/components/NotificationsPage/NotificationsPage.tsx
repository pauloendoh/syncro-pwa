import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import useHideNotificationDotsMutation from '../../hooks/react-query/notification/useHideNotificationDotsMutation'
import { useNotificationsQuery } from '../../hooks/react-query/notification/useNotificationsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import FlexCol from '../_common/flex/FlexCol'
import LoggedLayout from '../_common/layout/LoggedLayout'
import FollowNotificationItem from './FollowNotificationItem/FollowNotificationItem'
import ItemRecommendationNotificationItem from './ItemRecommendationNotificationItem/ItemRecommendationNotificationItem'
import RatingImportRequestNotificationItem from './RatingImportRequestNotificationItem/RatingImportRequestNotificationItem'

type Props = {}

const NotificationsPage = (props: Props) => {
  const { data: notifications, isLoading, refetch } = useNotificationsQuery()

  const { mutate: submitHideDots } = useHideNotificationDotsMutation()

  const router = useRouter()

  useEffect(() => {
    const exitingFunction = () => {
      submitHideDots(undefined, {})
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

  const { isSmallScreen } = useMyMediaQuery()

  return (
    <LoggedLayout>
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
