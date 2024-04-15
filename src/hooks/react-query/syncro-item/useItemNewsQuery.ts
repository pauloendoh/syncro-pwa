import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { ItemNewsDto } from './types/ItemNewsDto'

export const useItemNewsQuery = (syncroItemId: string) => {
  const axios = useAxios(false)

  return useQuery<ItemNewsDto[], AxiosError>(
    [urls.api.itemNews(syncroItemId)],
    () =>
      axios
        .get<ItemNewsDto[]>(urls.api.itemNews(syncroItemId))
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  )
}
