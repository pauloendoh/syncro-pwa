import { Box, Center, Flex, Text, Title, Tooltip } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import useSavedPositionSheetStore from '../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'

interface Props {
  itemType: SyncroItemType
  savedItems: InterestDto[]
}

const SavedItemsByType = ({ savedItems, ...props }: Props) => {
  const type = useSyncroItemTypeMap({
    itemType: props.itemType,
  })

  const { openSheet } = useSavedPositionSheetStore()

  const queryClient = useQueryClient()
  const handleClick = (interest: InterestDto) => {
    if (interest.syncroItem) {
      queryClient.setQueryData<SyncroItemDto>(
        [urls.api.syncroItemDetails(interest.syncroItem.id)],
        interest.syncroItem
      )
    }
  }

  if (!savedItems || savedItems.length === 0) return null

  return (
    <Box>
      <FlexCol mb={8}>
        <Title order={4}>
          {savedItems?.length} {type.getTypeLabel(savedItems.length > 1)}
        </Title>

        <Flex mt={8} sx={{ gap: 16, flexWrap: 'wrap' }}>
          {savedItems.map((savedItem) => (
            <Box
              key={savedItem.syncroItem?.id}
              sx={{
                position: 'relative',
              }}
            >
              <MyNextLink
                href={urls.pages.syncroItem(savedItem.syncroItem!.id)}
                onClick={() => handleClick(savedItem)}
              >
                <SyncroItemImage
                  item={savedItem.syncroItem}
                  width={160}
                  height={160}
                />
              </MyNextLink>

              {/* <Pressable onPress={() => openSheet(savedItem)}> */}
              <Tooltip label={'Change the position of this item'} withArrow>
                <Center
                  onClick={() => openSheet(savedItem)}
                  sx={{
                    right: 0,
                    bottom: 0,
                    position: 'absolute',
                    opacity: 0.9,
                    width: 32,
                    display: 'flex',
                    alignItems: 'center',
                    py: 2,
                    backgroundColor: '#151515',
                    cursor: 'pointer',
                  }}
                >
                  <Text>{savedItem.position}</Text>
                </Center>
              </Tooltip>
              {/* </Pressable> */}
            </Box>
          ))}
        </Flex>
      </FlexCol>
    </Box>
  )
}

export default SavedItemsByType
