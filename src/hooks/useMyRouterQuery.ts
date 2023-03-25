import { useRouter } from 'next/router'
import { SearchParams } from '../types/domain/search/SearchParams'
import { recommendItemsToUser } from './zustand/action-sheets/useRecommendUserSheetStore'
import { useEditItemModal } from './zustand/modals/useEditItemModal'
import { ratingDetailsId } from './zustand/modals/useRatingDetailsModalStore'
import { saveRatingModal } from './zustand/modals/useSaveRatingModalStore'

export const mangaPanelQueryKey = 'mangaPanel'

export const useMyRouterQuery = () => {
  const router = useRouter()
  const query = router.query
  return query as {
    syncroItemId: string
    userId: string
    q: string
    type: SearchParams['type']
    exploreSlug: ExploreSlug
    roomId: string
    oauthToken: string

    // dialogs are open
    recommendItemIsOpen: string
    [recommendItemsToUser]: string
    [ratingDetailsId]: string
    [saveRatingModal]: string
    [mangaPanelQueryKey]: string
    [useEditItemModal]: string
  }
}

export type ExploreSlug = 'popular-users' | 'rating-similarity' | 'new-users'
