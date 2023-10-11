import { useQuery } from '@tanstack/react-query'
import { urls } from '../../../../utils/urls/urls'
import { AmazonLinkDto } from './types/AmazonLinkDto'

export const useAmazonLinksQuery = (syncroItemId: string) => {
  return useQuery<AmazonLinkDto[], Error>(
    [urls.api.amazonLinks(syncroItemId)],
    {}
  )
}
