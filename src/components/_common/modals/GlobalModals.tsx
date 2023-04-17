import useSavedPositionSheetStore from '../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import EditItemModal from './EditItemModal/EditItemModal'
import EditRatingModal from './EditRatingModal/EditRatingModal'
import FeedSettingsModal from './FeedSettingsModal/FeedSettingsModal'
import FeedbackModal from './FeedbackModal/FeedbackModal'
import FollowersModal from './FollowersModal/FollowersModal'
import ItemRatedByModal from './ItemRatedByModal/ItemRatedByModal'
import RatingDetailsModal from './RatingDetailsModal/RatingDetailsModal'
import RecommendItemActionSheet from './RecommendItemActionSheet/RecommendItemActionSheet'
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
      <RecommendItemActionSheet />
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
    </>
  )
}

export default GlobalModals
