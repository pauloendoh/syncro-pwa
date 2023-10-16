import { useEffect } from 'react'
import { useSocket, useSocketEvent } from 'socket.io-react-hook'
import { myEnvs } from '../../utils/myEnvs'

export function useMySocketEvent<T>(eventName: string) {
  const {
    socket: mainSocket,
    connected,
    error,
  } = useSocket(myEnvs.NEXT_PUBLIC_API_URL)

  const { lastMessage, sendMessage } = useSocketEvent<T>(mainSocket, eventName)

  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])

  return {
    connected,
    lastMessage,
    sendMessage,
    mainSocket,
  }
}
