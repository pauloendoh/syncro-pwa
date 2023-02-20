import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { urls } from '../../../utils/urls'

export const useYoutubeTrailersQuery = (itemId: string) => {
  return useQuery<string[], AxiosError>([urls.api.youtubeVideos(itemId)])
}
