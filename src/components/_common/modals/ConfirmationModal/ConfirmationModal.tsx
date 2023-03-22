import { Modal, Title } from '@mantine/core'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'
import { zIndexes } from '../../../../utils/zIndexes'
import FlexVCenter from '../../flex/FlexVCenter'
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
      title={<Title order={4}>{initialValue.title}</Title>}
      styles={{
        overlay: {
          zIndex: zIndexes.confirmationModal,
        },
        inner: {
          top: 100,
          zIndex: zIndexes.confirmationModal,
        },
      }}
    >
      {initialValue.description ? initialValue.description : null}

      <FlexVCenter mt={24}>
        <SaveCancelButtons
          onSave={confirmAndClose}
          saveText={initialValue.confirmText ? initialValue.confirmText : 'Yes'}
          onCancel={closeModal}
        />
      </FlexVCenter>
    </Modal>
  )
}

export default ConfirmationModal
