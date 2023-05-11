import { Flex, Indicator, Text, Title, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { MessageRoomDto } from '../../../../hooks/react-query/message/types/MessageRoomDto'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { formatShortTimeago } from '../../../../utils/date/formatShortTimeago'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextImage300 from '../../../_common/image/MyNextImage300/MyNextImage300'
import MyNextLink from '../../../_common/overrides/MyNextLink'

type Props = {
  room: MessageRoomDto
  isSelected?: boolean
  unread?: boolean
}

const MessagesSidebarItem = (props: Props) => {
  const { authUser } = useAuthStore()
  const otherUser = useMemo(() => {
    return props.room.users.find((user) => user.id !== authUser?.id)
  }, [props.room])

  const lastMessage = useMemo(() => {
    if (!props.room?.messages) return null

    if (props.room.messages.length === 0) return null

    return props.room.messages[props.room.messages.length - 1]
  }, [props.room])

  const lastMessageIsYours = useMemo(() => {
    if (!lastMessage) return null
    return lastMessage.userId === authUser?.id
  }, [lastMessage, authUser])

  const theme = useMantineTheme()
  if (!otherUser) return null

  return (
    <MyNextLink
      href={urls.pages.messageRoom(props.room.id)}
      style={{ width: '100%' }}
    >
      <Flex
        p={8}
        gap={16}
        sx={{
          backgroundColor: props.isSelected ? theme.colors.dark[4] : undefined,

          ':hover': {
            backgroundColor: props.isSelected
              ? theme.colors.dark[4]
              : theme.colors.dark[3],
          },
          borderRadius: 4,
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
          <Indicator
            color={theme.colors.primary[9]}
            disabled={!props.unread}
            left={8}
            pos="relative"
          >
            <Title order={6}>{otherUser.username}</Title>
          </Indicator>

          <FlexVCenter
            gap={4}
            sx={{
              color: theme.colors.gray[5],
              fontSize: 14,
            }}
          >
            <Text lineClamp={1}>
              {lastMessageIsYours ? 'You: ' : ''}
              {lastMessage?.text}
            </Text>
            {lastMessage?.createdAt && (
              <Text miw={'fit-content'}>
                {' · '} {formatShortTimeago(new Date(lastMessage?.createdAt))}
              </Text>
            )}
          </FlexVCenter>
        </FlexCol>
      </Flex>
    </MyNextLink>
  )
}

export default MessagesSidebarItem
