import { Modal, Textarea, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  buildUserFeedbackDto,
  UserFeedbackDto,
} from '../../../../hooks/react-query/feedback/types/UserFeedbackDto'
import useSaveFeedbackMutation from '../../../../hooks/react-query/feedback/useSaveFeedbackMutation'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useFeedbackModalStore from '../../../../hooks/zustand/modals/useFeedbackModalStore'
import { useAxios } from '../../../../utils/useAxios'
import FlexVCenter from '../../flex/FlexVCenter'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
import FeedbackNumberInput from './FeedbackNumberInput/FeedbackNumberInput'

const FeedbackModal = () => {
  const { initialValue, closeModal, openModal } = useFeedbackModalStore()

  const theme = useMantineTheme()

  const { feedbackModal } = useMyRouterQuery()

  const router = useRouter()
  const axios = useAxios()

  const { handleSubmit, watch, setValue, register, reset } = useForm({
    defaultValues: initialValue || buildUserFeedbackDto(),
  })

  const {} = useMyRouterQuery()
  useEffect(() => {
    if (feedbackModal) {
      reset(initialValue || buildUserFeedbackDto())
    }
  }, [feedbackModal])

  const { mutate } = useSaveFeedbackMutation()

  const onSubmit = (data: UserFeedbackDto) => {
    mutate(data, {
      onSettled: () => {
        closeModal()
      },
    })
  }

  return (
    <Modal
      opened={!!feedbackModal}
      onClose={closeModal}
      withCloseButton={false}
      title={
        <Title order={5}>
          On a scale of 0 to 10, how likely are you to recommend Syncro to a
          friend?
        </Title>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FeedbackNumberInput
          onChange={(value) => {
            setValue('rating', value)
          }}
          value={watch('rating')}
        />
        <Textarea
          mt={16}
          label="Feedback"
          placeholder="What can we do better?"
          {...register('text')}
          autosize
          minRows={2}
        />
        <FlexVCenter mt={24}>
          <SaveCancelButtons onCancel={closeModal} />
        </FlexVCenter>
      </form>
    </Modal>
  )
}

export default FeedbackModal
