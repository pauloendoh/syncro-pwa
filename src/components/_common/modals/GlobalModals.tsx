import useSavedPositionSheetStore from '../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import ConnectorsModal from './ConnectorsModal/ConnectorsModal'
import EditItemModal from './EditItemModal/EditItemModal'
import EditRatingModal from './EditRatingModal/EditRatingModal'
import FeedSettingsModal from './FeedSettingsModal/FeedSettingsModal'
import FeedbackModal from './FeedbackModal/FeedbackModal'
import FollowersModal from './FollowersModal/FollowersModal'
import ItemRatedByModal from './ItemRatedByModal/ItemRatedByModal'
import LoadingModal from './LoadingModal/LoadingModal'
import OnboardingModal from './OnboardingModal/OnboardingModal'
import RatingDetailsModal from './RatingDetailsModal/RatingDetailsModal'
import RatingsImportModal from './RatingsImportModal/RatingsImportModal'
import RecommendItemModal from './RecommendItemModal/RecommendItemModal'
import RecommendItemsToUserModal from './RecommendItemsToUserModal/RecommendItemsToUserModal'
import ShareRatingModal from './ShareRatingModal/ShareRatingModal'
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
      <ConnectorsModal />
      <LoadingModal />
    </>
  )
}

export default GlobalModals
