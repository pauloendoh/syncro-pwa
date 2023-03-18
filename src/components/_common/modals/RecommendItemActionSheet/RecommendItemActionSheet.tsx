import { Modal, ScrollArea, Title } from '@mantine/core'
import { useMutualsSavedItemQuery } from '../../../../hooks/react-query/user/useMutualsSavedItemQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useRecommendItemActionSheetStore from '../../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore'
import FlexCol from '../../flex/FlexCol'
import RecommendMutualItem from './RecommendMutualItem/RecommendMutualItem'

interface Props {}

const RecommendItemActionSheet = (props: Props) => {
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
        console.log('close')
        handleClose()
      }}
      title={<Title order={4}>Recommend to your mutuals</Title>}
      styles={{
        modal: {
          top: 20,
        },
      }}
    >
      <ScrollArea>
        <FlexCol
          gap={16}
          sx={{
            maxHeight: 'calc(100vh - 200px)',
            paddingRight: 16,
          }}
        >
          {mutuals?.map((mutual) => (
            <RecommendMutualItem mutual={mutual} itemId={itemId!} />
          ))}
        </FlexCol>
      </ScrollArea>
    </Modal>
  )
}

export default RecommendItemActionSheet
