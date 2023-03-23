import { useEffect } from 'react'
import { socketEvents } from '../../../../utils/socketEvents'
import useAuthStore from '../../../zustand/useAuthStore'
import { useMySocketEvent } from '../../useMySocketEvent'
import { useNewMessageSocket } from './useNewMessageSocket/useNewMessageSocket'

// PE 1/3
export const useMessageRoomSockets = (messageRoomId: string | undefined) => {
  const { sendMessage: sendJoinRoomMessage, socket } =
    useMySocketEvent<boolean>(socketEvents.joinMessageRoom)

  const { authUser } = useAuthStore()

  useEffect(() => {
    if (messageRoomId && authUser) {
      sendJoinRoomMessage({
        messageRoomId: messageRoomId,
        userId: authUser.id,
      })
    }
  }, [messageRoomId, authUser])

  useNewMessageSocket()
}
