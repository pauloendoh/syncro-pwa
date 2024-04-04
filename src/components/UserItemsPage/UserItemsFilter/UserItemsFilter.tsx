import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import useUserItemsFilterStore from '../../../hooks/zustand/useUserItemsFilterStore'
import FlexCol from '../../_common/flex/FlexCol'
import MyTextInput from '../../_common/inputs/MyTextInput'

type Props = {}

const UserItemsFilter = ({ ...props }: Props) => {
  const filterStore = useUserItemsFilterStore()

  const [title, setTitle] = useState('')

  const [debouncedTitle] = useDebouncedValue(title, 300)

  useEffect(() => {
    filterStore.setTitle(debouncedTitle)
  }, [debouncedTitle])

  return (
    <FlexCol className="UserItemsFilter" w="100%">
      <MyTextInput
        label="Filter"
        value={title}
        icon={<MdSearch />}
        placeholder="Search by title"
        onChange={(e) => setTitle(e.target.value)}
      />
    </FlexCol>
  )
}

export default UserItemsFilter
