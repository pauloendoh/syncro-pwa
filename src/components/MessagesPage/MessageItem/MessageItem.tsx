import {
  ActionIcon,
  Box,
  Flex,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { useHover, useIntersection } from '@mantine/hooks'
import { useMemo, useRef } from 'react'
import { MdReply } from 'react-icons/md'
import { MessageDto } from '../../../hooks/react-query/message/types/MessageDto'
import { useRatingDetailsModalStore } from '../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyReactLinkify from '../../_common/text/MyReactLinkify'

type Props = {
  message: MessageDto
  isMyMessage: boolean
  isLast: boolean
  onReplyClick: () => void
}

const MessageItem = ({ message, isMyMessage, ...props }: Props) => {
  const theme = useMantineTheme()

  const containerRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.7,
  })

  const tooltipLabel = useMemo(() => {
    // locale date string + HH:mm
    return `${new Date(message.createdAt).toLocaleDateString()}
    ${new Date(message.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}
    
    `
  }, [message.createdAt])

  const { openModal: openModal } = useRatingDetailsModalStore()

  const { hovered, ref: rootRef } = useHover()
  const { authUser } = useAuthStore()

  const replyMessageTitle = useMemo(() => {
    if (isMyMessage) {
      if (authUser?.id === message.replyToMessage?.userId) {
        return 'You replied to yourself'
      }
      return `You replied to ${message.replyToMessage?.user.username}`
    }

    if (authUser?.id === message.replyToMessage?.userId) {
      return `${message.user.username} replied to your message`
    }

    return `${message.user.username} replied to themselves`
  }, [message.user.username, isMyMessage])

  return (
    <FlexCol
      gap={4}
      sx={{
        width: '100%',
      }}
      ref={rootRef}
    >
      {message.repliedToRating && (
        <Flex justify={isMyMessage ? 'flex-end' : 'flex-start'}>
          <FlexCol gap={4} align={isMyMessage ? 'flex-end' : 'flex-start'}>
            <Text size="xs" color={theme.colors.dark[2]}>
              {isMyMessage ? 'You replied' : 'Replied to your rating'}
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
      {message.replyToMessage && (
        <Flex justify={isMyMessage ? 'flex-end' : 'flex-start'}>
          <FlexCol
            gap={4}
            sx={{
              maxWidth: '90%',
              alignItems: isMyMessage ? 'flex-end' : 'flex-start',
            }}
          >
            <FlexVCenter gap={4}>
              <MdReply />
              <Text size="xs" color={theme.colors.dark[2]}>
                {replyMessageTitle}
              </Text>
            </FlexVCenter>
            <Flex
              sx={{
                background: theme.colors.dark[4],
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text
                size="xs"
                color={theme.colors.dark[2]}
                sx={{
                  // allow line break
                  whiteSpace: 'pre-wrap',
                }}
                lineClamp={2}
              >
                {message.replyToMessage.text}
              </Text>
            </Flex>
          </FlexCol>
        </Flex>
      )}
      <FlexVCenter
        ref={containerRef}
        sx={{
          // add fade in animation when rendered
          transition: 'opacity 0.3s ease-in-out',
          gap: 8,
          flexDirection: isMyMessage ? 'row-reverse' : 'row',
        }}
      >
        <Tooltip
          label={tooltipLabel}
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
            <Text
              sx={{
                // large url should not break the layout
                wordBreak: 'break-word',

                // allow line break
                whiteSpace: 'pre-wrap',
              }}
            >
              <MyReactLinkify openNewTab color={'white'}>
                {message.text}
              </MyReactLinkify>
            </Text>
          </Box>
        </Tooltip>
        <FlexVCenter
          sx={{
            visibility: hovered ? 'visible' : 'hidden',
            marginBottom: 8,
          }}
        >
          <ActionIcon
            onClick={() => {
              props.onReplyClick()
            }}
          >
            <MdReply size="20px" color={theme.colors.dark[2]} />
          </ActionIcon>
        </FlexVCenter>
      </FlexVCenter>
    </FlexCol>
  )
}

export default MessageItem
