import { Modal } from '@mantine/core'
import useInfoModalStore from '../../../../hooks/zustand/modals/useInfoModalStore'

const InfoModal = () => {
  const { text, closeModal, isOpen: modalIsOpen } = useInfoModalStore()

  return (
    <Modal
      opened={!!modalIsOpen}
      onClose={() => {
        closeModal()
      }}
      size="xs"
      withCloseButton={false}
    >
      {text}
    </Modal>
  )
}

export default InfoModal
