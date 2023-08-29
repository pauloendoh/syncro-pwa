import { Box, Flex, Grid, ScrollArea, Text } from '@mantine/core'
import { useEffect, useMemo, useRef } from 'react'
import { useMessageRoomQuery } from '../../hooks/react-query/message/useMessageRoomQuery'
import { useMessagesQuery } from '../../hooks/react-query/message/useMessagesQuery'
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
  const { roomId: roomId } = useMyRouterQuery()
  const { data: messageRoom } = useMessageRoomQuery(roomId)

  const { authUser } = useAuthStore()
  const otherUser = useMemo(() => {
    if (!messageRoom) {
      return null
    }
    return messageRoom.users.find((user) => user.id !== authUser?.id)
  }, [messageRoom, authUser])
  const { data: otherUserInfo, isLoading: loadingOtherUserInfo } =
    useUserInfoQuery(otherUser?.id)

  const { data: messages, isLoading } = useMessagesQuery(roomId)
  const viewport = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (!viewport.current) {
        return
      }

      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: 'auto',
      })
    }, 0)
  }, [viewport.current, messages])

  const { isMobile } = useMyMediaQuery()

  return (
    <LoggedLayout disableMarginBottom disableMarginTop={isMobile}>
      <Grid
        sx={{
          width: '100%',
          margin: isMobile ? 0 : undefined,
        }}
      >
        {!isMobile && (
          <Grid.Col span={0} xs={6} sm={4} md={4} lg={4}>
            <Flex justify="flex-end">
              <Box
                sx={{
                  width: 'clamp(280px, 100%, 400px)',
                }}
              >
                <MessagesSidebar />
              </Box>
            </Flex>
          </Grid.Col>
        )}

        <Grid.Col
          span={'auto'}
          xs={6}
          sm={8}
          md={6}
          lg={4}
          p={isMobile ? 0 : undefined}
        >
          {loadingOtherUserInfo && <CenterLoader />}
          {!!otherUserInfo && (
            <MyPaper
              sx={{
                padding: 0,
                background: isMobile ? 'transparent' : undefined,
              }}
            >
              <FlexVCenter
                sx={(theme) => ({
                  background: theme.colors.dark[8],
                })}
                gap={8}
                p={8}
              >
                {isMobile && <BackButton />}

                <MyNextLink href={urls.pages.userProfile(otherUserInfo.id)}>
                  <UserImage pictureUrl={otherUserInfo.profile?.pictureUrl} />
                </MyNextLink>
                <MyNextLink href={urls.pages.userProfile(otherUserInfo.id)}>
                  <Text>{otherUserInfo?.username}</Text>
                </MyNextLink>
              </FlexVCenter>

              <ScrollArea
                viewportRef={viewport}
                type="hover"
                id="message-scroll-area"
                sx={{
                  padding: 24,
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
                  />
                ))}
              </ScrollArea>

              <SendMessageInput roomId={roomId} />
            </MyPaper>
          )}
        </Grid.Col>
      </Grid>
    </LoggedLayout>
  )
}

export default MessagesPage
