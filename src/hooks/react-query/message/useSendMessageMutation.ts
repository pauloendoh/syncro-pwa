import { useMutation, useQueryClient } from '@tanstack/react-query'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'
import { useUserInfoQuery } from '../user/useUserInfoQuery'
import { MessageDto, buildMessageDto } from './types/MessageDto'
import { MessageRoomDto } from './types/MessageRoomDto'

const useSendMessageMutation = () => {
  const queryClient = useQueryClient()

  const { authUser } = useAuthStore()
  const { data: user } = useUserInfoQuery()
  const axios = useAxios()
  return useMutation(
    async (payload: { content: string; roomId: string; createdAt: string }) => {
      const message = buildMessageDto({
        roomId: payload.roomId,
        userId: authUser?.id,
        user,
        text: payload.content,
        createdAt: payload.createdAt,
      })
      // queryClient.setQueryData<MessageDto[]>(
      //   [urls.api.messagesByRoomId(payload.roomId)],
      //   (curr) => {
      //     if (!curr) {
      //       return [message]
      //     }

      //     return [...curr, message]
      //   }
      // )

      return axios
        .post<MessageDto>(urls.api.sendMessage, payload)
        .then((res) => res.data)
    },
    {
      onSuccess: (savedMessage, payload) => {
        // queryClient.setQueryData<MessageDto[]>(
        //   [urls.api.messagesByRoomId(payload.roomId)],
        //   (curr) => {
        //     return upsert(curr, savedMessage, (i) => {
        //       const isTrue =
        //         i.id === savedMessage.id ||
        //         (savedMessage.createdAt === i.createdAt &&
        //           savedMessage.userId === authUser?.id)

        //       console.log({ isTrue })
        //       return isTrue
        //     })
        //   }
        // )

        queryClient.invalidateQueries([
          urls.api.messagesByRoomId(payload.roomId),
        ])

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
