import { useQuery } from '@tanstack/react-query'
import { urls } from '../../../../utils/urls/urls'

export const useAmazonLinksQuery = (syncroItemId: string) => {
  return useQuery<any[], Error>([urls.api.amazonLinks(syncroItemId)], {})
}
