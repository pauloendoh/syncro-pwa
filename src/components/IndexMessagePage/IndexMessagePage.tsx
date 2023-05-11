import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useLastRoomsWithMessagesQuery } from '../../hooks/react-query/message/useLastRoomsWithMessagesQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { urls } from '../../utils/urls'
import MessagesSidebar from '../MessagesPage/MessagesSidebar/MessagesSidebar'
import LoggedLayout from '../_common/layout/LoggedLayout'
import CenterLoader from '../_common/overrides/CenterLoader/CenterLoader'

type Props = {}

const IndexMessagePage = (props: Props) => {
  const { data: rooms, isLoading } = useLastRoomsWithMessagesQuery()
  const router = useRouter()

  const { isMobile } = useMyMediaQuery()

  useEffect(() => {
    if (isMobile) return

    if (!isLoading && rooms && rooms.length > 0) {
      router.replace(urls.pages.messageRoom(rooms[0].id))
    }
  }, [isLoading, rooms, isMobile])

  return (
    <LoggedLayout disableMarginBottom>
      {isLoading || (rooms && rooms.length > 0) ? (
        isMobile ? (
          <MessagesSidebar />
        ) : (
          <CenterLoader />
        )
      ) : (
        <Container>
          No messages yet. Search user profile and click on "Message"
        </Container>
      )}
    </LoggedLayout>
  )
}

export default IndexMessagePage
