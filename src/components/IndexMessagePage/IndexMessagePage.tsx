import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useLastRoomsWithMessagesQuery } from '../../hooks/react-query/message/useLastRoomsWithMessagesQuery'
import { urls } from '../../utils/urls'
import LoggedLayout from '../_common/layout/LoggedLayout'
import CenterLoader from '../_common/overrides/CenterLoader/CenterLoader'

type Props = {}

const IndexMessagePage = (props: Props) => {
  const { data: rooms, isLoading } = useLastRoomsWithMessagesQuery()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && rooms && rooms.length > 0) {
      router.replace(urls.pages.messageRoom(rooms[0].id))
    }
  }, [rooms])

  return (
    <LoggedLayout disableMarginBottom>
      {isLoading || (rooms && rooms.length > 0) ? (
        <CenterLoader />
      ) : (
        <Container>
          No messages yet. Search user profile and click on "Message"
        </Container>
      )}
    </LoggedLayout>
  )
}

export default IndexMessagePage
