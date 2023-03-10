import { Modal } from '@mantine/core'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'

const ConfirmationModal = () => {
  const { isOpen, closeModal, initialValue } = useConfirmationModalStore()

  const confirmAndClose = () => {
    closeModal()
    initialValue.onConfirm()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={initialValue.title}
      sx={{
        zIndex: 1000,
      }}
    >
      <>
        {initialValue.description ? initialValue.description : null}

        <SaveCancelButtons
          onSave={confirmAndClose}
          saveText={initialValue.confirmText ? initialValue.confirmText : 'Yes'}
          onCancel={closeModal}
        />
      </>
    </Modal>
  )
}

export default ConfirmationModal
