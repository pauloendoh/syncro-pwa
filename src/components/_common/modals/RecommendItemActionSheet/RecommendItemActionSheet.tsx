import { Modal, Title } from '@mantine/core'
import { useMutualsSavedItemQuery } from '../../../../hooks/react-query/user/useMutualsSavedItemQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useRecommendItemActionSheetStore from '../../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore'
import { zIndexes } from '../../../../utils/zIndexes'
import RecommendItemToUsersList from './RecommendItemToUsersList/RecommendItemToUsersList'

// PE 1/3 - rename to RecommendItemModal
const RecommendItemActionSheet = () => {
  const { closeActionSheet, itemId } = useRecommendItemActionSheetStore()
  const { data: mutuals } = useMutualsSavedItemQuery(itemId!)

  const { recommendItemIsOpen } = useMyRouterQuery()

  const handleClose = () => {
    closeActionSheet()
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

export default RecommendItemActionSheet
