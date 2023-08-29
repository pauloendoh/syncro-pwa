import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { queryKeys } from '../../../utils/queryKeys'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { MessageRoomDto } from './types/MessageRoomDto'

export const useMessageRoomQuery = (roomId: string) => {
  const axios = useAxios()
  return useQuery<MessageRoomDto, AxiosError>(
    queryKeys.messageRoom(roomId),
    () =>
      axios
        .get<MessageRoomDto>(urls.api.messageRoomByRoomId(roomId))
        .then((res) => res.data),

    {
      enabled: !!roomId,
    }
  )
}
