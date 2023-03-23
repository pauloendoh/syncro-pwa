import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { urls } from '../../../utils/urls'
import { MessageDto } from './types/MessageDto'

export const useMessagesQuery = (roomId: string) => {
  return useQuery<MessageDto[], AxiosError>(
    [urls.api.messagesByRoomId(roomId)],
    {
      enabled: !!roomId,
      refetchOnWindowFocus: false,
    }
  )
}
