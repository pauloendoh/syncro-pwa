import useSavedPositionSheetStore from '../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import CompletedCountModal from './CompletedCountModal/CompletedCountModal'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import EditItemModal from './EditItemModal/EditItemModal'
import EditRatingModal from './EditRatingModal/EditRatingModal'
import { EditSharedListItemInterestModal } from './EditSharedListItemInterestModal/EditSharedListItemInterestModal'
import FeedSettingsModal from './FeedSettingsModal/FeedSettingsModal'
import FeedbackModal from './FeedbackModal/FeedbackModal'
import FollowersModal from './FollowersModal/FollowersModal'
import InfoModal from './InfoModal/InfoModal'
import ItemRatedByModal from './ItemRatedByModal/ItemRatedByModal'
import LoadingModal from './LoadingModal/LoadingModal'
import MinRatingSharingModal from './MinRatingSharingModal/MinRatingSharingModal'
import OnboardingModal from './OnboardingModal/OnboardingModal'
import RatingDetailsModal from './RatingDetailsModal/RatingDetailsModal'
import RatingsImportModal from './RatingsImportModal/RatingsImportModal'
import RecommendItemModal from './RecommendItemModal/RecommendItemModal'
import RecommendItemsToUserModal from './RecommendItemsToUserModal/RecommendItemsToUserModal'
import ShareRatingModal from './ShareRatingModal/ShareRatingModal'
import { UserSharedListsWithYouModal } from './UserSharedListsWithYouModal/UserSharedListsWithYouModal'
import UserSimilarityModal from './UserSimilarityModal/UserSimilarityModal'

type Props = {}

const GlobalModals = (props: Props) => {
  const savedPosition = useSavedPositionSheetStore()

  return (
    <>
      <ConfirmationModal />
      <EditRatingModal />
      <RecommendItemModal />
      <ItemRatedByModal />

      <RatingDetailsModal />
      <RecommendItemsToUserModal />
      <FollowersModal />
      <EditItemModal />
      <FeedbackModal />
      <ShareRatingModal />
      <FeedSettingsModal />

      <RatingsImportModal />
      <OnboardingModal />
      <UserSimilarityModal />
      <LoadingModal />

      <InfoModal />

      <MinRatingSharingModal />

      <CompletedCountModal />
      <UserSharedListsWithYouModal />
      <EditSharedListItemInterestModal />
    </>
  )
}

export default GlobalModals
