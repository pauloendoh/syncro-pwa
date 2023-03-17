import { Text } from '@mantine/core'
import { SortingByTypes } from '../../../types/domain/others/SortingByTypes'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import FlexCol from '../../_common/flex/FlexCol'
import UserItem from '../UserItem/UserItem'

interface Props {
  sortingBy: SortingByTypes
  isLoading: boolean
  sortedItems: UserItemDto[]
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
    <FlexCol gap={16} mt={16} style={{ flex: 1 }}>
      {sortingBy === 'customOrdering' && <Text>Min interest: 3</Text>}
      {sortedItems.map((item) => {
        return (
          <UserItem
            item={item}
            thisIsYourList={props.thisIsYourList}
            itemType={props.itemType}
            isCustomOrdering={sortingBy === 'customOrdering'}
          />
        )
      })}
    </FlexCol>
  )
}

export default UserItemsList
