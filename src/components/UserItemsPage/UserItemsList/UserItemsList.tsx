import { Text } from '@mantine/core'
import { useMemo } from 'react'
import { SortingByType } from '../../../types/domain/others/SortingByTypes'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import FlexCol from '../../_common/flex/FlexCol'
import UserItem from '../UserItem/UserItem'

interface Props {
  sortingBy: SortingByType
  isLoading: boolean
  sortedItems: UserItemDto[]
  thisIsYourList: boolean
  itemType: SyncroItemType
  onRefresh: () => void
  filterByGenre?: string | null
}

const UserItemsList = ({
  sortingBy,
  isLoading,
  sortedItems,
  ...props
}: Props) => {
  const finalItems = useMemo(() => {
    if (props.filterByGenre) {
      return sortedItems.filter((item) =>
        item.genres.includes(props.filterByGenre as string)
      )
    }

    return sortedItems
  }, [props.filterByGenre, sortedItems])

  return (
    <FlexCol gap={16} mt={16} style={{ flex: 1 }}>
      {/* delete? */}
      {sortingBy === 'customOrdering' && <Text>Min interest: 3</Text>}
      {finalItems.map((item) => {
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
