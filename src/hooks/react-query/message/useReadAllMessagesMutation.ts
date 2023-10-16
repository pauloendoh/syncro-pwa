import { useMutation, useQueryClient } from '@tanstack/react-query'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { MessageDto } from './types/MessageDto'
import { MessageRoomDto } from './types/MessageRoomDto'

const useReadAllMessagesMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  return useMutation(
    (payload: { roomId: string }) =>
      axios
        .post(urls.api.readAllMessages(payload.roomId))
        .then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        queryClient.setQueryData<MessageDto[]>(
          [urls.api.messagesByRoomId(payload.roomId)],
          (curr) => {
            return (
              curr?.map((message) => ({
                ...message,
                isRead: true,
              })) || []
            )
          }
        )

        queryClient.setQueryData<MessageRoomDto[]>(
          [urls.api.unreadMessagesRooms],
          (curr) => {
            return curr?.filter((room) => room.id !== payload.roomId) || []
          }
        )

        queryClient.setQueryData<MessageRoomDto[]>(
          [urls.api.messageRooms],
          (currMessageRooms) => {
            if (!currMessageRooms) {
              queryClient.invalidateQueries([urls.api.messageRooms])
              return currMessageRooms
            }

            return currMessageRooms?.map((room) => {
              return {
                ...room,
                messages:
                  room.messages?.map((message) => ({
                    ...message,
                    isRead: true,
                  })) || [],
              }
            })
          }
        )
      },
    }
  )
}

export default useReadAllMessagesMutation
