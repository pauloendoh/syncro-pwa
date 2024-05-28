import { Flex } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo } from 'react'
import useIsBackStore from '../../../hooks/zustand/useIsBackStore'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import UserItemsGridItem from './UserItemsGridItem/UserItemsGridItem'

type Props = {
  items: UserItemDto[]
  thisIsYourList: boolean
}

const UserItemsGrid = ({ ...props }: Props) => {
  const { entry, ref } = useIntersection()

  const { isBack, userItemsGridPage, setItemsGridPage } = useIsBackStore()
  useEffect(() => {
    if (!isBack) {
      setItemsGridPage(1)
    }
  }, [])

  const showingItems = useMemo(() => {
    return props.items.slice(0, userItemsGridPage * 20)
  }, [props.items, userItemsGridPage])

  useEffect(() => {
    if (entry?.isIntersecting) {
      setItemsGridPage(userItemsGridPage + 1)
    }
  }, [entry?.isIntersecting])

  return (
    <Flex className="UserItemsGridView" wrap={'wrap'} gap={16}>
      {showingItems.map((item) => (
        <UserItemsGridItem
          key={item.id}
          item={item}
          thisIsYourList={props.thisIsYourList}
        />
      ))}
      <div ref={ref} />
    </Flex>
  )
}

export default UserItemsGrid
