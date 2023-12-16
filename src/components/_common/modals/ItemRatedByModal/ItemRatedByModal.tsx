import { Modal, Tabs, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useItemRatedByQuery } from '../../../../hooks/react-query/rating/useItemRatedByQuery'
import useItemRatedByModalStore from '../../../../hooks/zustand/modals/useItemRatedByModalStore'
import FlexCol from '../../flex/FlexCol'
import Span from '../../text/Span'
import ItemRatedByModalItem from './ItemRatedByModalItem/ItemRatedByModalItem'

const ItemRatedByModal = () => {
  const { isOpen, itemId, closeModal, type, openModal } =
    useItemRatedByModalStore()

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

  const tabValue = useMemo(() => {
    if (type === 'you-follow') return '0'
    return '1'
  }, [type])

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={
        <Tabs
          value={tabValue}
          onTabChange={(value) => {
            if (value === '0') openModal(itemId!, 'you-follow')
            else openModal(itemId!, 'all-users')
          }}
        >
          <Tabs.List>
            <Tabs.Tab value={'0'}>Users you follow</Tabs.Tab>
            <Tabs.Tab value={'1'}>All users</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      }
      withCloseButton={false}
      styles={{
        root: {
          top: 80,
        },
        title: {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <FlexCol gap={16}>
        {sortedRatings.length === 0 && <Span>No entries yet</Span>}
        {sortedRatings.map((rating) => (
          <ItemRatedByModalItem rating={rating} />
        ))}
      </FlexCol>
    </Modal>
  )
}

export default ItemRatedByModal
