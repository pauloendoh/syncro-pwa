import { useEffect } from 'react'
import { socketEvents } from '../../../../utils/socketEvents'
import useAuthStore from '../../../zustand/useAuthStore'
import { useMySocketEvent } from '../../useMySocketEvent'

export const useMessageRoomSockets = (messageRoomId: string | undefined) => {
  const {
    sendMessage: sendJoinRoomMessage,
    connected,
    mainSocket,
  } = useMySocketEvent<boolean>(socketEvents.joinMessageRoom)

  const { authUser } = useAuthStore()

  useEffect(() => {
    if (messageRoomId && authUser && connected) {
      sendJoinRoomMessage({
        messageRoomId: messageRoomId,
        userId: authUser.id,
      })
    }
  }, [messageRoomId, authUser, mainSocket])
}
