import { ActionIcon, Flex, Modal } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { MdMoreHoriz, MdSearch } from 'react-icons/md'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import useUserItemsFilterStore from '../../../hooks/zustand/useUserItemsFilterStore'
import FlexCol from '../../_common/flex/FlexCol'
import MyTextInput from '../../_common/inputs/MyTextInput'
import UserItemsFilterSharedSection from './UserItemsFilterSharedSection/UserItemsFilterSharedSection'

type Props = {}

const UserItemsFilter = ({ ...props }: Props) => {
  const filterStore = useUserItemsFilterStore()

  const [title, setTitle] = useState('')

  const [debouncedTitle] = useDebouncedValue(title, 300)

  useEffect(() => {
    filterStore.setTitle(debouncedTitle)
  }, [debouncedTitle])

  const { isMobile } = useMyMediaQuery()

  const [modalOpen, setModalOpen] = useState(false)

  if (!isMobile) {
    return (
      <FlexCol className="UserItemsFilter" w="100%" gap={8}>
        <MyTextInput
          label="Filter"
          value={title}
          icon={<MdSearch />}
          placeholder="Search by title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <UserItemsFilterSharedSection />
      </FlexCol>
    )
  }

  return (
    <>
      <Flex gap={8} align="flex-end" justify={'space-between'} w="100%">
        <MyTextInput
          label="Filter"
          value={title}
          icon={<MdSearch />}
          placeholder="Search by title"
          onChange={(e) => setTitle(e.target.value)}
          w="100%"
        />
        <ActionIcon
          variant="filled"
          size="lg"
          onClick={() => setModalOpen(true)}
          color={filterStore.getFilterCount() > 0 ? 'secondary' : 'gray'}
          sx={{
            bottom: 1,
          }}
        >
          <MdMoreHoriz />
        </ActionIcon>
      </Flex>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Filters"
      >
        <FlexCol gap={8}>
          <UserItemsFilterSharedSection />
        </FlexCol>
      </Modal>
    </>
  )
}

export default UserItemsFilter
