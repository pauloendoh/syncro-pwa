import { Flex, Indicator, Text, Title, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { MessageDto } from '../../../../hooks/react-query/message/types/MessageDto'
import { MessageRoomDto } from '../../../../hooks/react-query/message/types/MessageRoomDto'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { formatShortTimeago } from '../../../../utils/date/formatShortTimeago'
import { urls } from '../../../../utils/urls/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextImage300 from '../../../_common/image/MyNextImage300/MyNextImage300'
import MyNextLink from '../../../_common/overrides/MyNextLink'

type Props = {
  room: MessageRoomDto
  isSelected?: boolean
  parentWidth: number
  message?: MessageDto
}

const MessagesSidebarItem = (props: Props) => {
  const { authUser } = useAuthStore()
  const otherUser = useMemo(() => {
    return props.room.users.find((user) => user.id !== authUser?.id)
  }, [props.room])

  const lastMessage = props.room?.messages?.[0]

  const lastMessageIsYours = useMemo(() => {
    if (!lastMessage) return null
    return lastMessage.userId === authUser?.id
  }, [lastMessage, authUser])

  const theme = useMantineTheme()

  const hasUnread = useMemo(() => {
    return props.room?.messages?.some(
      (message) => message.userId !== authUser?.id && !message.isRead
    )
  }, [props.room, authUser])

  if (!otherUser) return null

  return (
    <MyNextLink
      href={urls.pages.messageRoom(props.room.id)}
      style={{
        width: '100%',
      }}
    >
      <Flex
        p={8}
        pr={24}
        gap={16}
        sx={{
          backgroundColor: props.isSelected ? theme.colors.dark[4] : undefined,

          ':hover': {
            backgroundColor: props.isSelected
              ? theme.colors.dark[4]
              : theme.colors.dark[3],
          },
        }}
      >
        <MyNextImage300
          alt={otherUser.username}
          src={otherUser.profile.pictureUrl}
          width={40}
          height={40}
          style={{
            borderRadius: '50%',
          }}
        />
        <FlexCol>
          <Title order={6}>{otherUser.username}</Title>

          <FlexVCenter
            gap={4}
            sx={{
              color: theme.colors.gray[5],
            }}
          >
            <Text
              lineClamp={1}
              size="sm"
              sx={{
                maxWidth: props.parentWidth - 140,
              }}
            >
              {lastMessageIsYours ? 'You: ' : ''}
              {lastMessage?.text}
            </Text>

            <Indicator
              color={theme.colors.secondary[9]}
              position="middle-end"
              size={8}
              styles={{
                indicator: {
                  right: '-4px !important',
                  position: 'absolute',
                },
              }}
              disabled={!hasUnread}
            >
              {lastMessage?.createdAt && (
                <Text w={40} size="sm">
                  {' · '} {formatShortTimeago(new Date(lastMessage?.createdAt))}
                </Text>
              )}
            </Indicator>
          </FlexVCenter>
        </FlexCol>
      </Flex>
    </MyNextLink>
  )
}

export default MessagesSidebarItem
