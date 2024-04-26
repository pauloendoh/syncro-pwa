import { Box, Flex, Grid, ScrollArea, Text } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MessageDto } from '../../hooks/react-query/message/types/MessageDto'
import { useMessageRoomQuery } from '../../hooks/react-query/message/useMessageRoomQuery'
import { useMessagesQuery } from '../../hooks/react-query/message/useMessagesQuery'
import useReadAllMessagesMutation from '../../hooks/react-query/message/useReadAllMessagesMutation'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { urls } from '../../utils/urls/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import UserImage from '../_common/image/SyncroItemImage/UserImage/UserImage'
import LoggedLayout from '../_common/layout/LoggedLayout'
import CenterLoader from '../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../_common/overrides/MyNextLink'
import MyPaper from '../_common/overrides/MyPaper'
import BackButton from './BackButton/BackButton'
import MessageItem from './MessageItem/MessageItem'
import MessagesSidebar from './MessagesSidebar/MessagesSidebar'
import SendMessageInput from './SendMessageInput/SendMessageInput'

type Props = {}

const MessagesPage = (props: Props) => {
  const { roomId } = useMyRouterQuery()
  const { data: messageRoom } = useMessageRoomQuery(roomId)

  const { authUser } = useAuthStore()
  const otherUser = useMemo(() => {
    if (!messageRoom) {
      return null
    }
    return messageRoom.users.find((user) => user.id !== authUser?.id)
  }, [messageRoom, authUser, roomId])

  const { data: otherUserInfo } = useUserInfoQuery(otherUser?.id)

  const { data: messages, isLoading } = useMessagesQuery(roomId)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (!scrollAreaRef.current) {
        return
      }

      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }, 100)
  }, [scrollAreaRef.current, messages])

  const { isMobile } = useMyMediaQuery()

  const { mutate: submitReadAllMessages } = useReadAllMessagesMutation()

  const { ref: seenDivRef, entry } = useIntersection({
    root: scrollAreaRef.current,
    threshold: 0,
  })

  const theirMessages = useMemo(() => {
    if (!messages) return []
    return messages.filter((message) => message.userId !== authUser?.id)
  }, [messages])

  const hasUnseenMessages = useMemo(() => {
    if (!theirMessages) return false
    return theirMessages.some((message) => !message.isRead)
  }, [theirMessages])

  useEffect(() => {
    if (!entry?.isIntersecting) return
    if (!hasUnseenMessages) return

    submitReadAllMessages({ roomId })
  }, [entry?.isIntersecting, hasUnseenMessages])

  const [replyingToMessage, setReplyingToMessage] = useState<MessageDto | null>(
    null
  )

  return (
    <LoggedLayout
      disableMarginBottom
      disableMarginTop={isMobile}
      mustBeLoggedIn
    >
      <Grid
        sx={{
          width: '100%',
          margin: isMobile ? 0 : undefined,
        }}
      >
        {!isMobile && (
          <Grid.Col span={0} xs={6} sm={5} md={4} lg={4}>
            <Flex justify="flex-end">
              <MessagesSidebar />
            </Flex>
          </Grid.Col>
        )}

        <Grid.Col
          span={'auto'}
          xs={6}
          sm={7}
          md={6}
          lg={4}
          p={isMobile ? 0 : undefined}
        >
          <MyPaper
            sx={{
              padding: 0,
              background: isMobile ? 'transparent' : undefined,
            }}
          >
            <FlexVCenter
              sx={(theme) => ({
                background: theme.colors.dark[8],
                height: 56,
              })}
              gap={8}
              p={8}
            >
              {isMobile && <BackButton />}

              {!!otherUserInfo && (
                <>
                  <MyNextLink href={urls.pages.userProfile(otherUserInfo.id)}>
                    <UserImage pictureUrl={otherUserInfo.profile?.pictureUrl} />
                  </MyNextLink>
                  <MyNextLink href={urls.pages.userProfile(otherUserInfo.id)}>
                    <Text>{otherUserInfo?.username}</Text>
                  </MyNextLink>
                </>
              )}
            </FlexVCenter>

            <ScrollArea
              viewportRef={scrollAreaRef}
              type="hover"
              id="message-scroll-area"
              sx={{
                padding: 24,
                paddingBottom: 8,
                height: isMobile
                  ? 'calc(100vh - 120px )'
                  : 'calc(100vh - 240px )',
              }}
            >
              {isLoading && <CenterLoader />}
              {messages?.map((message, index) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isMyMessage={message.userId === authUser?.id}
                  isLast={index === messages.length - 1}
                  onReplyClick={() => {
                    setReplyingToMessage(message)
                  }}
                />
              ))}

              <Box
                sx={{
                  visibility: 'hidden',
                }}
                ref={seenDivRef}
                h={4}
              />
            </ScrollArea>

            <SendMessageInput
              roomId={roomId}
              replyingToMessage={replyingToMessage}
              onClearReply={() => setReplyingToMessage(null)}
            />
          </MyPaper>
        </Grid.Col>
      </Grid>
    </LoggedLayout>
  )
}

export default MessagesPage
