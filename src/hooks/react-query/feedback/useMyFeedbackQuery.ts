import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'
import { UserFeedbackDto } from './types/UserFeedbackDto'

export const useMyFeedbackQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<UserFeedbackDto, Error>([urls.api.feedback], {
    enabled: !!authUser,
  })
}
