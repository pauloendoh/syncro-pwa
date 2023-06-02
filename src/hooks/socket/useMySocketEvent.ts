import { useSocket, useSocketEvent } from 'socket.io-react-hook'
import { myEnvs } from '../../utils/myEnvs'

export function useMySocketEvent<T>(eventName: string) {
  const { socket: mainSocket, connected } = useSocket(
    myEnvs.NEXT_PUBLIC_API_URL
  )

  const { lastMessage, sendMessage } = useSocketEvent<T>(mainSocket, eventName)

  return {
    connected,
    lastMessage,
    sendMessage,
    mainSocket,
  }
}
