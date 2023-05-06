import { Box, Flex, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { MessageDto } from '../../../hooks/react-query/message/types/MessageDto'
import useReadAllMessagesMutation from '../../../hooks/react-query/message/useReadAllMessagesMutation'
import { useUnreadMessageRoomsQuery } from '../../../hooks/react-query/message/useUnreadMessageRoomsQuery'

type Props = {
  message: MessageDto
  isMyMessage: boolean
  isLast: boolean
}

const MessageItem = ({ message, isMyMessage, isLast }: Props) => {
  const theme = useMantineTheme()

  const { data: unreadRooms } = useUnreadMessageRoomsQuery()
  const unreadRoom = useMemo(() => {
    if (!unreadRooms) {
      return null
    }

    return unreadRooms.find((room) => room.id === message.roomId)
  }, [unreadRooms, message.roomId])

  const containerRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.7,
  })

  const { mutate: submitReadAllMessages } = useReadAllMessagesMutation()

  useEffect(() => {
    if (isMyMessage) return
    if (!entry?.isIntersecting) return
    if (!isLast) return
    if (message.isRead) return

    submitReadAllMessages({ roomId: message.roomId })
  }, [entry?.isIntersecting, message, isLast, isMyMessage])

  return (
    <Flex
      ref={containerRef}
      sx={{
        justifyContent: isMyMessage ? 'flex-end' : 'flex-start',

        // add fade in animation when rendered
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <Tooltip
        label={new Date(message.createdAt).toLocaleString()}
        withArrow
        position={isMyMessage ? 'left' : 'right'}
      >
        <Box
          ref={ref}
          px={16}
          py={8}
          sx={{
            background: isMyMessage
              ? theme.colors.secondary[9]
              : theme.colors.dark[4],
            borderRadius: 16,
            marginBottom: 8,
            maxWidth: '80%',
          }}
        >
          <Text>{message.text}</Text>
        </Box>
      </Tooltip>
    </Flex>
  )
}

export default MessageItem
