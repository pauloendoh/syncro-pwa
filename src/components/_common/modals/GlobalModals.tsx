import useSavedPositionSheetStore from '../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
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
import SavedPositionModal from './SavedPositionModal/SavedPositionModal'
import ShareRatingModal from './ShareRatingModal/ShareRatingModal'

type Props = {}

const GlobalModals = (props: Props) => {
  const savedPosition = useSavedPositionSheetStore()

  return (
    <>
      <ConfirmationModal />
      <EditRatingModal />
      <RecommendItemModal />
      <ItemRatedByModal />
      <SavedPositionModal
        initialValue={savedPosition.initialValue}
        isOpen={savedPosition.isOpen}
        onClose={savedPosition.closeSheet}
      />
      <RatingDetailsModal />
      <RecommendItemsToUserModal />
      <FollowersModal />
      <EditItemModal />
      <FeedbackModal />
      <ShareRatingModal />
      <FeedSettingsModal />

      <RatingsImportModal />
      <OnboardingModal />

      <LoadingModal />
    </>
  )
}

export default GlobalModals
