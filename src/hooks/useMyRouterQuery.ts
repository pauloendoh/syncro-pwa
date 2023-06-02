import { useRouter } from 'next/router'
import { SearchParams } from '../types/domain/search/SearchParams'
import { QueryParams } from '../utils/queryParams'
import { ImportRatingsType } from './zustand/modals/useImportRatingsModalStore'

export const useMyRouterQuery = () => {
  const query = useRouter().query as {
    syncroItemId: string
    userId: string
    q: string
    type: SearchParams['type']
    exploreSlug: ExploreSlug
    roomId: string
    oauthToken: string
    initialPage: string
    redirectTo: string

    recommendItemIsOpen: string
    [QueryParams.recommendItemsToUser]: string
    [QueryParams.ratingDetailsId]: string
    [QueryParams.saveRatingModal]: string
    [QueryParams.editingItem]: string
    [QueryParams.feedbackModal]: string
    [QueryParams.followModal]: string
    [QueryParams.shareRatingModal]: string
    [QueryParams.feedSettingsModal]: string
    [QueryParams.importRatings]: ImportRatingsType
    [QueryParams.onboardingModal]: string
  }

  return query
}

export type ExploreSlug = 'popular-users' | 'rating-similarity' | 'new-users'
