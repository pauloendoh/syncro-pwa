import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import ItemRatedByModal from './ItemRatedByModal/ItemRatedByModal'
import RatingModal from './RatingModal/RatingModal'
import RecommendItemActionSheet from './RecommendItemActionSheet/RecommendItemActionSheet'

type Props = {}

const GlobalModals = (props: Props) => {
  return (
    <>
      <RatingModal />
      <ConfirmationModal />
      <RecommendItemActionSheet />
      <ItemRatedByModal />
    </>
  )
}

export default GlobalModals
