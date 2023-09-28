import { Modal, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useItemRatedByQuery } from '../../../../hooks/react-query/rating/useItemRatedByQuery'
import useItemRatedByModalStore from '../../../../hooks/zustand/modals/useItemRatedByModalStore'
import FlexCol from '../../flex/FlexCol'
import Span from '../../text/Span'
import ItemRatedByModalItem from './ItemRatedByModalItem/ItemRatedByModalItem'

const ItemRatedByModal = () => {
  const { isOpen, itemId, closeModal, type } = useItemRatedByModalStore()

  const { data } = useItemRatedByQuery(itemId!, type)

  // newest first
  const sortedRatings = useMemo(
    () => data?.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) || [],
    [data]
  )

  const theme = useMantineTheme()

  const router = useRouter()
  useEffect(() => {
    closeModal()
  }, [router.pathname])

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={
        <Title order={4}>
          {type === 'you-follow'
            ? 'Rated by users you follow'
            : 'Rated by Syncro users'}
        </Title>
      }
      withCloseButton={false}
      styles={{
        root: {
          top: 80,
        },
      }}
    >
      <FlexCol gap={16}>
        {sortedRatings.length === 0 && <Span>No user ratings yet</Span>}
        {sortedRatings.map((rating) => (
          <ItemRatedByModalItem rating={rating} />
        ))}
      </FlexCol>
    </Modal>
  )
}

export default ItemRatedByModal
