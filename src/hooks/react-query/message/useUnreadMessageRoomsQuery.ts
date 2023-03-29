import { useQuery } from '@tanstack/react-query'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'
import { MessageRoomDto } from './types/MessageRoomDto'

export const useUnreadMessageRoomsQuery = () => {
  const { authUser } = useAuthStore()
  const axios = useAxios()
  return useQuery<MessageRoomDto[]>([urls.api.unreadMessagesRooms], {
    enabled: !!authUser,
  })
}
