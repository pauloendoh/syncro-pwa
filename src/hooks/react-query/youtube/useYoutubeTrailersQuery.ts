import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { urls } from '../../../utils/urls'

export const useYoutubeTrailersQuery = (
  itemId: string,
  options: {
    enabled: boolean
  }
) => {
  return useQuery<string[], AxiosError>([urls.api.youtubeVideos(itemId)], {
    enabled: options.enabled,
  })
}
