import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { MessageDto } from './types/MessageDto'

const useSendMessageMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()
  return useMutation(
    (payload: { content: string; roomId: string }) =>
      axios
        .post<MessageDto>(urls.api.sendMessage, payload)
        .then((res) => res.data),
    {
      onSuccess: (message, payload) => {
        queryClient.setQueryData<MessageDto[]>(
          [urls.api.messagesByRoomId(payload.roomId)],
          (curr) => {
            return upsert(curr, message, (i) => i.id === message.id)
          }
        )
      },
    }
  )
}

export default useSendMessageMutation
