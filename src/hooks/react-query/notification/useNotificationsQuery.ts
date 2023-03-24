import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'
import { NotificationDto } from './types/NotificationDto'

export const useNotificationsQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<NotificationDto[], Error>([urls.api.notifications], {
    enabled: !!authUser,
  })
}
