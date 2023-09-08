import { Flex, Textarea, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import useSendMessageMutation from '../../../hooks/react-query/message/useSendMessageMutation'

type Props = {
  roomId: string
}

const SendMessageInput = (props: Props) => {
  const [message, setMessage] = useState('')
  const { mutate: submitSendMessage } = useSendMessageMutation()

  const handleSubmit = () => {
    if (message.trim().length === 0) return

    submitSendMessage({
      content: message,
      roomId: props.roomId,
    })

    setMessage('')
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
      <Flex w="100%" px={24} pb={16}>
        <Textarea
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
    </form>
  )
}

export default SendMessageInput
