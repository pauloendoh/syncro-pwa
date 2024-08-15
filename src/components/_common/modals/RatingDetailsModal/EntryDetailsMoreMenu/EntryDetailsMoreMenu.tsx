import { ActionIcon, Menu } from '@mantine/core'
import { MdEdit, MdMoreHoriz, MdOutlineShare } from 'react-icons/md'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import useShareRatingModalStore from '../../../../../hooks/zustand/modals/useShareRatingModalStore'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'

type Props = {
  rating: RatingDto
}

const EntryDetailsMoreMenu = (props: Props) => {
  const { openModal } = useSaveRatingModalStore()
  const { openModal: openShareRatingModal } = useShareRatingModalStore()

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon size="sm">
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<MdEdit size={14} />}
          onClick={() => {
            openModal(props.rating)
          }}
        >
          Edit entry
        </Menu.Item>
        <Menu.Item
          icon={<MdOutlineShare size={14} />}
          onClick={() => {
            openShareRatingModal(props.rating)
          }}
        >
          Share entry
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default EntryDetailsMoreMenu
