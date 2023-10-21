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
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { MessageDto } from '../../../hooks/react-query/message/types/MessageDto'
import { useRatingDetailsModalStore } from '../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import SyncroItemLink from '../../_common/SyncroItemLink/SyncroItemLink'
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
      return `${message.user.username} replied to you`
    }

    return `${message.user.username} replied to themselves`
  }, [message.user.username, isMyMessage])

  const recommendedTypeMap = useSyncroItemTypeMap({
    itemType: message.recommendedItem?.type,
  })

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
              {isMyMessage ? 'You replied' : 'Replied to your entry'}
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
      {message.recommendedItem && (
        <Flex justify={isMyMessage ? 'flex-end' : 'flex-start'}>
          <FlexCol gap={4} align={isMyMessage ? 'flex-end' : 'flex-start'}>
            <Text size="xs" color={theme.colors.dark[2]}>
              {isMyMessage
                ? `You recommended a ${recommendedTypeMap.getTypeLabelLowerCase()}:`
                : `Recommended a ${recommendedTypeMap.getTypeLabelLowerCase()}: `}
            </Text>
            {message.recommendedItem && (
              <SyncroItemLink
                item={message.recommendedItem}
                previewWithinPortal
              >
                <SyncroItemImage item={message.recommendedItem} width={80} />
              </SyncroItemLink>
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
              <MdReply color={theme.colors.dark[2]} />
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
      {!!message.text && (
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
            label={new Date(message.createdAt).toLocaleDateString()}
            position={isMyMessage ? 'left' : 'right'}
            withinPortal
          >
            <Box
              ref={ref}
              px={8}
              pt={8}
              pb={4}
              sx={{
                background: isMyMessage
                  ? theme.colors.secondary[9]
                  : theme.colors.dark[4],
                borderRadius: 8,
                marginBottom: 8,
                maxWidth: '80%',
                minWidth: '108px',
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
              <Flex justify={'flex-end'}>
                <Text
                  size="xs"
                  color={theme.colors.dark[1]}
                  sx={{
                    // allow line break
                    whiteSpace: 'pre-wrap',
                    opacity: 0.7,
                  }}
                >
                  {new Date(message.createdAt).toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Flex>
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
              <MdReply size="20px" />
            </ActionIcon>
          </FlexVCenter>
        </FlexVCenter>
      )}
    </FlexCol>
  )
}

export default MessageItem
