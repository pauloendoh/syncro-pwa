import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../utils/urls/urls'
import useAuthStore from '../../zustand/useAuthStore'
import { UserSettingsDto } from './types/UserSettingsDto'

export const useSettingsQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<UserSettingsDto, Error>([urls.api.settings], {
    enabled: !!authUser,
  })
}
