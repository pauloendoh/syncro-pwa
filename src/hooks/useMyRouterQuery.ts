import { useRouter } from 'next/router'
import { SearchParams } from '../types/domain/search/SearchParams'
import { QueryParams } from '../utils/queryParams'
import { recommendItemsToUser } from './zustand/action-sheets/useRecommendUserSheetStore'
import { editingItem } from './zustand/modals/useEditItemModal'
import { feedbackModal } from './zustand/modals/useFeedbackModalStore'
import { followModal } from './zustand/modals/useFollowersModalStore'
import { ratingDetailsId } from './zustand/modals/useRatingDetailsModalStore'
import { saveRatingModal } from './zustand/modals/useSaveRatingModalStore'

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

    // PE 1/3 - use QueryParams
    recommendItemIsOpen: string
    [recommendItemsToUser]: string
    [ratingDetailsId]: string
    [saveRatingModal]: string
    [editingItem]: string
    [feedbackModal]: string
    [followModal]: string
    [QueryParams.shareRatingModal]: string
  }
}

export type ExploreSlug = 'popular-users' | 'rating-similarity' | 'new-users'
