import { useMutation, useQueryClient } from '@tanstack/react-query'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'
import { useUserInfoQuery } from '../user/useUserInfoQuery'
import { MessageDto } from './types/MessageDto'

const useReplyToRatingMutation = () => {
  const queryClient = useQueryClient()

  const { authUser } = useAuthStore()
  const { data: user } = useUserInfoQuery()
  const axios = useAxios()
  return useMutation(
    async (payload: { ratingId: string; content: string }) => {
      return axios
        .post<MessageDto>(urls.api.replyToRating, payload)
        .then((res) => res.data)
    },
    {
      onSuccess: (savedMessage, payload) => {
        // myNotifications.success('Message sent!')
      },
    }
  )
}

export default useReplyToRatingMutation
