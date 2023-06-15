import { Box, Flex, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { MessageDto } from '../../../hooks/react-query/message/types/MessageDto'
import useReadAllMessagesMutation from '../../../hooks/react-query/message/useReadAllMessagesMutation'
import { useUnreadMessageRoomsQuery } from '../../../hooks/react-query/message/useUnreadMessageRoomsQuery'
import useRatingDetailsModalStore from '../../../hooks/zustand/modals/useRatingDetailsModalStore'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'

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

  const tooltipLabel = useMemo(() => {
    // locale date string + HH:mm
    return `${new Date(message.createdAt).toLocaleDateString()}
    ${new Date(message.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}
    
    `
  }, [message.createdAt])

  const { openModal } = useRatingDetailsModalStore()

  return (
    <FlexCol gap={4}>
      {message.repliedToRating && (
        <Flex justify={isMyMessage ? 'flex-end' : 'flex-start'}>
          <FlexCol gap={4} align={isMyMessage ? 'flex-end' : 'flex-start'}>
            <Text size="xs" color={theme.colors.dark[2]}>
              {isMyMessage
                ? 'You replied to their rating'
                : 'Replied to your rating'}
            </Text>
            {message.repliedToRating.syncroItem && (
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (message.repliedToRating) {
                    openModal(message.repliedToRating)
                  }
                }}
              >
                <SyncroItemImage
                  item={message.repliedToRating.syncroItem}
                  width={80}
                />
              </div>
            )}
          </FlexCol>
        </Flex>
      )}
      <Flex
        ref={containerRef}
        sx={{
          justifyContent: isMyMessage ? 'flex-end' : 'flex-start',

          // add fade in animation when rendered
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <Tooltip
          label={tooltipLabel}
          withArrow
          position={isMyMessage ? 'left' : 'right'}
          withinPortal
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
    </FlexCol>
  )
}

export default MessageItem
