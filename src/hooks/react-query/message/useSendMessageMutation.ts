import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { MessageDto } from './types/MessageDto'
import { MessageRoomDto } from './types/MessageRoomDto'

const useSendMessageMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()
  return useMutation(
    (payload: { content: string; roomId: string }) =>
      axios
        .post<MessageDto>(urls.api.sendMessage, payload)
        .then((res) => res.data),
    {
      onSuccess: (savedMessage, payload) => {
        queryClient.setQueryData<MessageDto[]>(
          [urls.api.messagesByRoomId(payload.roomId)],
          (curr) => {
            return upsert(curr, savedMessage, (i) => i.id === savedMessage.id)
          }
        )

        queryClient.setQueryData<MessageRoomDto[]>(
          [urls.api.lastRoomsWithMessages],
          (curr) => {
            if (!curr) {
              queryClient.invalidateQueries([urls.api.lastRoomsWithMessages])
              return curr
            }

            const messages = curr.find(
              (room) => room.id === payload.roomId
            )?.messages
            if (!messages) {
              queryClient.invalidateQueries([urls.api.lastRoomsWithMessages])
              return curr
            }

            messages[0] = savedMessage
          }
        )
      },
    }
  )
}

export default useSendMessageMutation
