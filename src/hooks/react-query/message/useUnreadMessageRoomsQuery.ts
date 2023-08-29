import { useQuery } from '@tanstack/react-query'
import { urls } from '../../../utils/urls/urls'
import useAuthStore from '../../zustand/useAuthStore'
import { MessageRoomDto } from './types/MessageRoomDto'

export const useUnreadMessageRoomsQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<MessageRoomDto[]>([urls.api.unreadMessagesRooms], {
    enabled: !!authUser,
  })
}
