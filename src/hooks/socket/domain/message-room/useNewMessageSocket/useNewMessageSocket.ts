import { useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { useEffect } from 'react'
import { socketEvents } from '../../../../../utils/socketEvents'
import { urls } from '../../../../../utils/urls'
import { MessageDto } from '../../../../react-query/message/types/MessageDto'
import { useMySocketEvent } from '../../../useMySocketEvent'

export const useNewMessageSocket = () => {
  const { lastMessage } = useMySocketEvent<{
    messageRoomId: string
    message: MessageDto
  }>(socketEvents.newMessage)
  const queryClient = useQueryClient()

  useEffect(() => {
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
  }, [lastMessage])
}
