import { ActionIcon, Modal, Textarea } from '@mantine/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MdChatBubbleOutline } from 'react-icons/md'
import useReplyToRatingMutation from '../../../../../hooks/react-query/message/useReplyToRatingMutation'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../../../utils/mantine/myNotifications'
import FlexCol from '../../../../_common/flex/FlexCol'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'
import SaveCancelButtons from '../../../../_common/inputs/SaveCancelButtons'

type Props = {
  rating: RatingDto
}

const ReplyToRatingSection = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const [message, setMessage] = useState('')

  const { mutate: submitReply, isLoading } = useReplyToRatingMutation()

  const emotes = useMemo(() => ['👏', '❤️', '😂', '😮', '😢', '😡'], [])

  const handleClose = () => {
    setIsOpen(false)
    setMessage('')
  }

  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        ref.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSubmitMessage = () => {
    submitReply(
      {
        ratingId: props.rating.id,
        content: message,
      },
      {
        onSuccess: () => {
          handleClose()
          myNotifications.success('Reply sent')
        },
      }
    )
  }

  return (
    <>
      <ActionIcon onClick={() => setIsOpen(true)}>
        <MdChatBubbleOutline size={22} />
      </ActionIcon>

      <Modal
        size={240}
        opened={isOpen}
        onClose={handleClose}
        styles={{
          title: {
            width: '100%',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 500,
          },
        }}
        title={'React to rating'}
        withCloseButton={false}
      >
        <FlexVCenter justify={'center'} gap={4}>
          {emotes.map((emote) => (
            <ActionIcon
              key={emote}
              onClick={() =>
                submitReply(
                  {
                    ratingId: props.rating.id,
                    content: emote,
                  },
                  {
                    onSuccess: () => {
                      handleClose()
                      myNotifications.success('Reaction sent!')
                    },
                  }
                )
              }
            >
              {emote}
            </ActionIcon>
          ))}
        </FlexVCenter>

        <FlexCol mt={16} gap={8}>
          <Textarea
            placeholder={
              props.rating?.user?.username
                ? `Reply to ${props.rating?.user?.username}`
                : 'Reply'
            }
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            minRows={1}
            autosize
            ref={ref}
          />

          <SaveCancelButtons
            onEnabledAndCtrlEnter={handleSubmitMessage}
            saveText="Send"
            onSave={handleSubmitMessage}
            isLoading={isLoading}
            onCancel={handleClose}
            disabled={message.trim().length === 0}
          />
        </FlexCol>
      </Modal>
    </>
  )
}

export default ReplyToRatingSection
