import { useEffect } from 'react'
import { useMySocketEvent } from '../../../hooks/socket/useMySocketEvent'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { socketEvents } from '../../../utils/socketEvents'

export const useUserSockets = () => {
  const { authUser } = useAuthStore()

  const { sendMessage, mainSocket, connected } = useMySocketEvent(
    socketEvents.joinUserRoom
  )

  useEffect(() => {
    if (authUser && connected) {
      sendMessage(authUser.id)
    }
  }, [authUser, connected, mainSocket])
}
