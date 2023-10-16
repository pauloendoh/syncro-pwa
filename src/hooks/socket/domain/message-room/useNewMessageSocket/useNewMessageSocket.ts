import { useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { useEffect } from 'react'
import { socketEvents } from '../../../../../utils/socketEvents'
import { urls } from '../../../../../utils/urls/urls'
import { MessageDto } from '../../../../react-query/message/types/MessageDto'
import { MessageRoomDto } from '../../../../react-query/message/types/MessageRoomDto'
import { useMyRouterQuery } from '../../../../useMyRouterQuery'
import { useMySocketEvent } from '../../../useMySocketEvent'

export const useNewMessageSocket = () => {
  const { lastMessage, connected, mainSocket } = useMySocketEvent<{
    messageRoomId: string
    message: MessageDto
  }>(socketEvents.newMessage)
  const queryClient = useQueryClient()

  const { roomId } = useMyRouterQuery()

  useEffect(() => {
    if (!connected) return
    if (!lastMessage) return

    queryClient.setQueryData<MessageDto[]>(
      [urls.api.messagesByRoomId(lastMessage.messageRoomId)],
      (curr) =>
        upsert(
          curr,
          lastMessage.message,
          (i) => i.id === lastMessage.message.id
        )
    )

    queryClient.setQueryData<MessageRoomDto[]>(
      [urls.api.messageRooms],
      (currMessageRooms) => {
        if (!currMessageRooms) {
          queryClient.invalidateQueries([urls.api.messageRooms])
          queryClient.invalidateQueries([urls.api.unreadMessagesRooms])
          return currMessageRooms
        }

        if (roomId === lastMessage.messageRoomId) return currMessageRooms

        queryClient.invalidateQueries([urls.api.unreadMessagesRooms])

        return currMessageRooms?.map((room) => {
          const isTargetRoom = room.id === lastMessage.messageRoomId
          return {
            ...room,
            messages: isTargetRoom ? [lastMessage.message] : room.messages,
          }
        })
      }
    )
  }, [lastMessage, connected, mainSocket])
}
