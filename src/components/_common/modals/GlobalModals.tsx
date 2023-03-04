import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import RatingModal from './RatingModal/RatingModal'

type Props = {}

const GlobalModals = (props: Props) => {
  return (
    <>
      <RatingModal />
      <ConfirmationModal />
    </>
  )
}

export default GlobalModals
