import { Modal, Title } from '@mantine/core'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import { useModalZIndex } from '../../../../hooks/utils/useModalZIndex'
import useRecommendItemModalStore from '../../../../hooks/zustand/modals/useRecommendItemModalStore'
import RecommendItemToUsersList from './RecommendItemToUsersList/RecommendItemToUsersList'

const RecommendItemModal = () => {
  const { closeModal, itemId } = useRecommendItemModalStore()

  const { data: itemDetails } = useSyncroItemDetailsQuery(itemId)

  const { recommendItemIsOpen } = useMyRouterQuery()

  const handleClose = () => {
    closeModal()
  }

  const zIndex = useModalZIndex({ isOpen: !!recommendItemIsOpen })

  return (
    <Modal
      opened={!!recommendItemIsOpen}
      onClose={() => {
        handleClose()
      }}
      title={<Title order={4}>Recommend to users you follow</Title>}
      styles={{
        inner: {
          top: 40,
          zIndex,
        },
        overlay: {
          zIndex,
        },
      }}
    >
      {itemId && itemDetails && (
        <RecommendItemToUsersList
          itemId={itemId!}
          maxHeight="calc(100vh - 240px)"
        />
      )}
    </Modal>
  )
}

export default RecommendItemModal
