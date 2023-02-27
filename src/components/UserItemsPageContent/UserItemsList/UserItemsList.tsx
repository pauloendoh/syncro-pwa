import { Box, Text } from '@mantine/core'
import { SortingByTypes } from '../../../types/domain/others/SortingByTypes'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import FlexCol from '../../_common/flex/FlexCol'
import UserItem from '../UserItem/UserItem'

interface Props {
  sortingBy: SortingByTypes
  isLoading: boolean
  sortedItems: UserItemDto[]
  onPressItem: (item: SyncroItemDto) => void
  thisIsYourList: boolean
  itemType: SyncroItemType
  onRefresh: () => void
}

const UserItemsList = ({
  sortingBy,
  isLoading,
  sortedItems,
  ...props
}: Props) => {
  return (
    <FlexCol gap={4} mt={4} style={{ flex: 1 }}>
      {sortingBy === 'customOrdering' && <Text>Min interest: 3</Text>}
      <Box style={{ flex: 1 }}>
        {sortedItems.map((item) => {
          return (
            <UserItem
              item={item}
              onPress={() => props.onPressItem(item)}
              thisIsYourList={props.thisIsYourList}
              itemType={props.itemType}
              isCustomOrdering={sortingBy === 'customOrdering'}
            />
          )
        })}
      </Box>
    </FlexCol>
  )
}

export default UserItemsList
