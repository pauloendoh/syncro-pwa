import { Textarea } from '@mantine/core'
import { useState } from 'react'
import useSendMessageMutation from '../../../hooks/react-query/message/useSendMessageMutation'

type Props = {
  roomId: string
}

const SendMessageInput = (props: Props) => {
  const [message, setMessage] = useState('')
  const { mutate: submitSendMessage } = useSendMessageMutation()

  const handleSubmit = () => {
    submitSendMessage(
      { content: message, roomId: props.roomId },
      {
        onSuccess: () => {
          setMessage('')
        },
      }
    )
  }

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
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        placeholder="Type your message here. Press enter to send."
        rows={3}
        sx={{
          flex: 1,
        }}
        autosize
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.shiftKey) {
            return
          }
          if (e.key === 'Enter') {
            handleSubmit()
          }
        }}
      />
    </form>
  )
}

export default SendMessageInput
