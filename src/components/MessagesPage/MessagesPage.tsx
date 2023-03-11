import { Box, Container, Text, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useMessageRoomQuery } from '../../hooks/react-query/message/useMessageRoomQuery'
import { useMessagesQuery } from '../../hooks/react-query/message/useMessagesQuery'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { urls } from '../../utils/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import UserImage from '../_common/image/SyncroItemImage/UserImage/UserImage'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyNextLink from '../_common/overrides/MyNextLink'
import MyPaper from '../_common/overrides/MyPaper'
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
            <Box
              sx={{
                padding: 16,
              }}
            >
              {messages?.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    padding: 8,
                    background:
                      message.userId === authUser?.id
                        ? theme.colors.secondary[9]
                        : theme.colors.dark[4],
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text>{message.text}</Text>
                </Box>
              ))}

              <SendMessageInput roomId={roomId} />
            </Box>
          </MyPaper>
        )}
      </Container>
    </LoggedLayout>
  )
}

export default MessagesPage
