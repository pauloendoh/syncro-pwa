import useSavedPositionSheetStore from '../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import EditItemModal from './EditItemModal/EditItemModal'
import FollowersModal from './FollowersModal/FollowersModal'
import ItemRatedByModal from './ItemRatedByModal/ItemRatedByModal'
import RatingDetailsModal from './RatingDetailsModal/RatingDetailsModal'
import RecommendItemActionSheet from './RecommendItemActionSheet/RecommendItemActionSheet'
import RecommendUserSheet from './RecommendUserSheet/RecommendUserSheet'
import SavedPositionModal from './SavedPositionModal/SavedPositionModal'
import SaveRatingModal from './SaveRatingModal/SaveRatingModal'

type Props = {}

const GlobalModals = (props: Props) => {
  const savedPosition = useSavedPositionSheetStore()

  return (
    <>
      <ConfirmationModal />
      <SaveRatingModal />
      <RecommendItemActionSheet />
      <ItemRatedByModal />
      <SavedPositionModal
        initialValue={savedPosition.initialValue}
        isOpen={savedPosition.isOpen}
        onClose={savedPosition.closeSheet}
      />
      <RatingDetailsModal />
      <RecommendUserSheet />
      <FollowersModal />
      <EditItemModal />
    </>
  )
}

export default GlobalModals
