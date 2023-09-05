import {
  Box,
  Flex,
  Indicator,
  Modal,
  ScrollArea,
  Tabs,
  Title,
} from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { useMemo, useState } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useItemsToRecommendQuery } from '../../../../hooks/react-query/item-recommendation/useItemsToRecommendQuery'
import { useUserHighSimilarityTypesQueryUtils } from '../../../../hooks/react-query/rating/user-similarity/useUserHighSimilarityTypesQueryUtils'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useRecommendItemsToUserModalStore from '../../../../hooks/zustand/action-sheets/useRecommendUserSheetStore'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import textContainsWords from '../../../../utils/text/textContainsWords'
import MyTextInput from '../../inputs/MyTextInput'
import CenterLoader from '../../overrides/CenterLoader/CenterLoader'
import Span from '../../text/Span'
import ItemToRecommendOption from './ItemToRecommendOption/ItemToRecommendOption'
import { itemToRecommendTabOptions } from './itemToRecommendTabOptions/itemToRecommendTabOptions'

const RecommendItemsToUserModal = () => {
  const { closeActionSheet, userId } = useRecommendItemsToUserModalStore()
  const { recommendItemsToUser } = useMyRouterQuery()

  const [currentType, setCurrentType] = useState<SyncroItemType>('movie')

  const itemType = useSyncroItemTypeMap({
    itemType: currentType,
  })

  const { data: itemsToRecommend, isLoading } = useItemsToRecommendQuery(
    userId!,
    itemType.itemType
  )

  const [debouncedText, setDebouncedText] = useDebouncedState('', 250)
  const sortedItemsToRecommend = useMemo(
    () =>
      itemsToRecommend
        ?.filter((item) => textContainsWords(item.item.title, debouncedText))
        .sort((a, b) => b.myRating - a.myRating) || [],
    [itemsToRecommend, debouncedText]
  )

  const { isMobile } = useMyMediaQuery()

  const highSimilarityTypes = useUserHighSimilarityTypesQueryUtils(userId!)

  return (
    <Modal
      opened={!!recommendItemsToUser}
      onClose={closeActionSheet}
      title={<Title order={4}>Recommend</Title>}
      fullScreen={isMobile}
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
                <Indicator
                  label="High"
                  size={16}
                  disabled={!highSimilarityTypes.includes(option.key as any)}
                >
                  <Span>{option.label}</Span>
                </Indicator>
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <MyTextInput
            mt={8}
            onChange={(e) => setDebouncedText(e.currentTarget.value)}
            placeholder={'Search for a title'}
            pb={4}
          />

          <ScrollArea.Autosize
            mt={4}
            mah={isMobile ? 'calc(100vh - 176px)' : 'calc(100vh - 268px)'}
          >
            <Flex gap={8} pr={16} wrap={'wrap'}>
              {isLoading && <CenterLoader width={'100%'} />}
              {sortedItemsToRecommend?.map((item) => (
                <ItemToRecommendOption
                  itemToRecommend={item}
                  userId={userId!}
                  key={item.item.id}
                />
              ))}
            </Flex>
          </ScrollArea.Autosize>
        </Tabs>
      </Box>
    </Modal>
  )
}

export default RecommendItemsToUserModal
