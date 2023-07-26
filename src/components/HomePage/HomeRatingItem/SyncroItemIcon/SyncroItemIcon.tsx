import { useMantineTheme } from '@mantine/core'
import { IconBaseProps } from 'react-icons'
import { FiFilm, FiTv } from 'react-icons/fi'
import { IoLogoGameControllerA, IoMdBook } from 'react-icons/io'
import { IoMusicalNotesSharp } from 'react-icons/io5'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
interface Props {
  type: SyncroItemType
  color?: string
  size?: number
}

export const SyncroItemBaseIcon: {
  [key in SyncroItemType]: React.ComponentType<IconBaseProps>
} = {
  book: IoMdBook,
  game: IoLogoGameControllerA,
  manga: IoMdBook,
  movie: FiFilm,
  music: IoMusicalNotesSharp,
  tvSeries: FiTv,
}

const SyncroItemIcon = (props: Props) => {
  const { colors } = useMantineTheme()

  const { type, color = colors.dark[0], size = 16 } = props

  const Component = SyncroItemBaseIcon[type]

  return <Component size={size} color={color} />
}

export default SyncroItemIcon
