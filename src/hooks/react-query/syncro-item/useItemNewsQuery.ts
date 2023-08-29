import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { urls } from '../../../utils/urls/urls'
import { ItemNewsDto } from './types/ItemNewsDto'

export const useItemNewsQuery = (syncroItemId: string) => {
  return useQuery<ItemNewsDto[], AxiosError>(
    [urls.api.itemNews(syncroItemId)],
    {
      refetchOnWindowFocus: false,
    }
  )
}
