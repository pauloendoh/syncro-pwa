import { Container, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { useEffect, useMemo, useRef } from 'react'
import { useMessageRoomQuery } from '../../hooks/react-query/message/useMessageRoomQuery'
import { useMessagesQuery } from '../../hooks/react-query/message/useMessagesQuery'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMessageRoomSockets } from '../../hooks/socket/domain/message-room/useMessageRoomSockets'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { urls } from '../../utils/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import UserImage from '../_common/image/SyncroItemImage/UserImage/UserImage'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyNextLink from '../_common/overrides/MyNextLink'
import MyPaper from '../_common/overrides/MyPaper'
import MessageItem from './MessageItem/MessageItem'
import SendMessageInput from './SendMessageInput/SendMessageInput'

type Props = {}

const MessagesPage = (props: Props) => {
  const { roomId: roomId } = useMyRouterQuery()
  const { data: messageRoom } = useMessageRoomQuery(roomId)

  const { authUser } = useAuthStore()
  const otherUser = useMemo(() => {
    if (!messageRoom) {
      return null
    }
    return messageRoom.users.find((user) => user.id !== authUser?.id)
  }, [messageRoom, authUser])
  const { data: user } = useUserInfoQuery(otherUser?.id)

  const { data: messages } = useMessagesQuery(roomId)
  const theme = useMantineTheme()
  const viewport = useRef<HTMLDivElement>(null)

  useMessageRoomSockets(roomId)

  useEffect(() => {
    setTimeout(() => {
      if (!viewport.current) {
        return
      }

      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: 'auto',
      })
    }, 100)
  }, [viewport.current, messages])

  return (
    <LoggedLayout>
      <Container size="xs">
        {!!user && (
          <MyPaper
            sx={{
              padding: 0,
            }}
          >
            <FlexVCenter
              sx={(theme) => ({
                background: theme.colors.dark[8],
              })}
              gap={8}
              p={8}
            >
              <MyNextLink href={urls.pages.user(user.id)}>
                <UserImage pictureUrl={user.profile?.pictureUrl} />
              </MyNextLink>
              <MyNextLink href={urls.pages.user(user.id)}>
                <Text>{user?.username}</Text>
              </MyNextLink>
            </FlexVCenter>

            <ScrollArea
              viewportRef={viewport}
              id="message-scroll-area"
              sx={{
                padding: 24,
                height: 'calc(100vh - 300px )',
              }}
            >
              {messages?.map((message, index) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isMyMessage={message.userId === authUser?.id}
                  isLast={index === messages.length - 1}
                />
              ))}
            </ScrollArea>

            <SendMessageInput roomId={roomId} />
          </MyPaper>
        )}
      </Container>
    </LoggedLayout>
  )
}

export default MessagesPage
