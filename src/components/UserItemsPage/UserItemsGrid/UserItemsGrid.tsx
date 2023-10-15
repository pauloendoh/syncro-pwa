import { Flex } from '@mantine/core'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import UserItemsGridItem from './UserItemsGridItem/UserItemsGridItem'

type Props = {
  items: UserItemDto[]
  thisIsYourList: boolean
}

const UserItemsGrid = ({ ...props }: Props) => {
  return (
    <Flex className="UserItemsGridView" wrap={'wrap'} gap={16}>
      {props.items.map((item) => (
        <UserItemsGridItem
          key={item.id}
          item={item}
          thisIsYourList={props.thisIsYourList}
        />
      ))}
    </Flex>
  )
}

export default UserItemsGrid
