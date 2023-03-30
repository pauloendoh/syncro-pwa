import { useMutation, useQueryClient } from '@tanstack/react-query'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { UserFeedbackDto } from './types/UserFeedbackDto'

const useSaveFeedbackMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (payload: UserFeedbackDto) =>
      axios
        .post<UserFeedbackDto>(urls.api.feedback, payload)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        myNotifications.success('Feedback saved!')
        qc.setQueryData<UserFeedbackDto>([urls.api.feedback], saved)
      },
    }
  )
}

export default useSaveFeedbackMutation
