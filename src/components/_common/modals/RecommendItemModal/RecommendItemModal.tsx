import { Modal, Title } from '@mantine/core'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useRecommendItemModalStore from '../../../../hooks/zustand/modals/useRecommendItemModalStore'
import { zIndexes } from '../../../../utils/zIndexes'
import RecommendItemToUsersList from './RecommendItemToUsersList/RecommendItemToUsersList'

const RecommendItemModal = () => {
  const { closeModal, itemId } = useRecommendItemModalStore()

  const { recommendItemIsOpen } = useMyRouterQuery()

  const handleClose = () => {
    closeModal()
  }

  return (
    <Modal
      opened={!!recommendItemIsOpen}
      onClose={() => {
        handleClose()
      }}
      title={<Title order={4}>Recommend to your mutuals</Title>}
      styles={{
        inner: {
          top: 40,
          zIndex: zIndexes.editRatingModal,
        },
        overlay: {
          zIndex: zIndexes.editRatingModal,
        },
      }}
    >
      <RecommendItemToUsersList
        itemId={itemId!}
        maxHeight="calc(100vh - 200px)"
      />
    </Modal>
  )
}

export default RecommendItemModal
