import { Modal } from '@mantine/core'
import { useModalZIndex } from '../../../../hooks/utils/useModalZIndexState'
import useInfoModalStore from '../../../../hooks/zustand/modals/useInfoModalStore'

const InfoModal = () => {
  const { text, closeModal, isOpen: modalIsOpen } = useInfoModalStore()

  const zIndex = useModalZIndex({
    isOpen: !!modalIsOpen,
  })

  return (
    <Modal
      opened={!!modalIsOpen}
      onClose={() => {
        closeModal()
      }}
      size="xs"
      withCloseButton={false}
      styles={{
        overlay: {
          zIndex,
        },
        inner: {
          zIndex,
        },
      }}
    >
      {text}
    </Modal>
  )
}

export default InfoModal
