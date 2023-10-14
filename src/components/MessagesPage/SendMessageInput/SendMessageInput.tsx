import { ActionIcon, Flex, Textarea, useMantineTheme } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { MessageDto } from '../../../hooks/react-query/message/types/MessageDto'
import useSendMessageMutation from '../../../hooks/react-query/message/useSendMessageMutation'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import Span from '../../_common/text/Span'

type Props = {
  roomId: string
  replyingToMessage: MessageDto | null
  onClearReply: () => void
}

const SendMessageInput = (props: Props) => {
  const [message, setMessage] = useState('')
  const { mutate: submitSendMessage } = useSendMessageMutation()

  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!props.replyingToMessage) {
      return
    }

    inputRef.current?.focus()
  }, [props.replyingToMessage])

  const handleSubmit = () => {
    if (message.trim().length === 0) return

    submitSendMessage({
      content: message,
      roomId: props.roomId,
      replyToMessageId: props.replyingToMessage?.id || null,
    })

    setMessage('')
    props.onClearReply()
  }

  const theme = useMantineTheme()

  return (
    <form
      style={{
        display: 'flex',
      }}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <FlexCol w="100%" gap={8}>
        {props.replyingToMessage && (
          <FlexCol
            sx={{
              borderTop: `1px solid ${theme.colors.dark[4]}`,
              paddingInline: 24,
              paddingBlock: 4,
            }}
          >
            <FlexVCenter justify={'space-between'}>
              <Span size="sm">
                Replying to {props.replyingToMessage.user.username}
              </Span>
              <ActionIcon onClick={() => props.onClearReply()}>
                <MdClose />
              </ActionIcon>
            </FlexVCenter>
            <Span size="sm" color={theme.colors.dark[2]}>
              {props.replyingToMessage.text}
            </Span>
          </FlexCol>
        )}
        <Flex w="100%" px={24} pb={16}>
          <Textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            placeholder="Type your message here. Press enter to send."
            rows={3}
            sx={{
              flex: 1,
            }}
            styles={{
              input: {
                background: theme.colors.dark[4],
                '::placeholder': {
                  color: theme.colors.dark[2],
                },
              },
            }}
            autosize
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey) {
                return
              }
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
        </Flex>
      </FlexCol>
    </form>
  )
}

export default SendMessageInput
