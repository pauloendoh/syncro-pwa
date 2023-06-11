import { Box, Modal, ScrollArea, Tabs, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useItemsToRecommendQuery } from '../../../../hooks/react-query/item-recommendation/useItemsToRecommendQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useRecommendItemsToUserModalStore from '../../../../hooks/zustand/action-sheets/useRecommendUserSheetStore'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../flex/FlexCol'
import ItemToRecommendOption from './ItemToRecommendOption/ItemToRecommendOption'
import { itemToRecommendTabOptions } from './itemToRecommendTabOptions/itemToRecommendTabOptions'

const RecommendItemsToUserModal = () => {
  const { closeActionSheet, userId } = useRecommendItemsToUserModalStore()
  const { recommendItemsToUser } = useMyRouterQuery()

  const [currentType, setCurrentType] = useState<SyncroItemType>('movie')

  const itemType = useSyncroItemTypeMap({
    itemType: currentType,
  })

  const { data: itemsToRecommend } = useItemsToRecommendQuery(
    userId!,
    itemType.itemType
  )

  const sortedItemsToRecommend = useMemo(
    () => itemsToRecommend?.sort((a, b) => b.myRating - a.myRating) || [],
    [itemsToRecommend]
  )

  return (
    <Modal
      opened={!!recommendItemsToUser}
      onClose={closeActionSheet}
      title={<Title order={4}>Recommend</Title>}
      size="md"
    >
      <Box mt={4}>
        <Tabs
          styles={{
            tabsList: {
              overflowY: 'auto',
              flexWrap: 'unset',
              paddingBottom: 6,
              borderBottom: 'none',
            },
          }}
          value={currentType}
          onTabChange={(newTabValue) => {
            setCurrentType(newTabValue as SyncroItemType)
          }}
        >
          <Tabs.List>
            {itemToRecommendTabOptions.map((option) => (
              <Tabs.Tab key={option.key} value={option.key}>
                {option.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <ScrollArea h={'calc(100vh - 240px)'}>
            <FlexCol gap={16} mt={16} pr={16}>
              {sortedItemsToRecommend?.map((item) => (
                <ItemToRecommendOption
                  itemToRecommend={item}
                  userId={userId!}
                  key={item.item.id}
                />
              ))}
            </FlexCol>
          </ScrollArea>
        </Tabs>
      </Box>
    </Modal>
  )
}

export default RecommendItemsToUserModal
