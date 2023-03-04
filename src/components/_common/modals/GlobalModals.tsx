import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import RatingModal from './RatingModal/RatingModal'
import RecommendItemActionSheet from './RecommendItemActionSheet/RecommendItemActionSheet'

type Props = {}

const GlobalModals = (props: Props) => {
  return (
    <>
      <RatingModal />
      <ConfirmationModal />
      <RecommendItemActionSheet />
    </>
  )
}

export default GlobalModals
