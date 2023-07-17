import { useQuery } from '@tanstack/react-query'
import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'
import { MessageRoomDto } from './types/MessageRoomDto'

export const useSidebarMessageRoomsQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<MessageRoomDto[]>([urls.api.lastRoomsWithMessages], {
    enabled: !!authUser,
  })
}
