import { Flex } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useState } from 'react'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import UserItemsGridItem from './UserItemsGridItem/UserItemsGridItem'

type Props = {
  items: UserItemDto[]
  thisIsYourList: boolean
}

const UserItemsGrid = ({ ...props }: Props) => {
  const { entry, ref } = useIntersection()
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [props.items])

  const showingItems = useMemo(() => {
    return props.items.slice(0, page * 20)
  }, [props.items, page])

  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage((prevPage) => prevPage + 1)
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
