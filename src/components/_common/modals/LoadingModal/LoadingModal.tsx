import { Modal } from '@mantine/core'
import useLoadingModalStore from '../../../../hooks/zustand/modals/useLoadingModalStore'
import CenterLoader from '../../overrides/CenterLoader/CenterLoader'

const LoadingModal = () => {
  const { isOpen, closeModal } = useLoadingModalStore()

  return (
    <Modal opened={!!isOpen} onClose={closeModal}>
      <CenterLoader />
    </Modal>
  )
}

export default LoadingModal
