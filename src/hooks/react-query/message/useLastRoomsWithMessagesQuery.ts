import { useQuery } from '@tanstack/react-query'
import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'
import { MessageRoomDto } from './types/MessageRoomDto'

// PE 1/3 - rename to useSidebarLastMessageQuery ?
export const useLastRoomsWithMessagesQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<MessageRoomDto[]>([urls.api.lastRoomsWithMessages], {
    enabled: !!authUser,
  })
}
