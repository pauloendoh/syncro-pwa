import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../utils/urls/urls'

export const useDailyLoggedUsersQuery = () => {
  return useQuery<DailyLoggedUser[], Error>([
    urls.api.dashboard.getDailyLoggedUsers(),
  ])
}

interface DailyLoggedUser {
  userId: string
  username: string
  count: number
  lastLoggedDate: string
}
