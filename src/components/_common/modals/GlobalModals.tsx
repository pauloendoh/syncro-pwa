import useSavedPositionSheetStore from '../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import ItemRatedByModal from './ItemRatedByModal/ItemRatedByModal'
import RatingModal from './RatingModal/RatingModal'
import RecommendItemActionSheet from './RecommendItemActionSheet/RecommendItemActionSheet'
import SavedPositionModal from './SavedPositionModal/SavedPositionModal'

type Props = {}

const GlobalModals = (props: Props) => {
  const savedPosition = useSavedPositionSheetStore()
  return (
    <>
      <RatingModal />
      <ConfirmationModal />
      <RecommendItemActionSheet />
      <ItemRatedByModal />
      <SavedPositionModal
        initialValue={savedPosition.initialValue}
        isOpen={savedPosition.isOpen}
        onClose={savedPosition.closeSheet}
      />
    </>
  )
}

export default GlobalModals
