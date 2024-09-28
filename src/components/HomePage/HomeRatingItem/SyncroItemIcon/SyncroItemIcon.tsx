import { useMantineTheme } from '@mantine/core'
import { IconBaseProps } from 'react-icons'
import { FiFilm, FiTv } from 'react-icons/fi'
import { IoLogoGameControllerA } from 'react-icons/io'
import { IoMusicalNotesSharp } from 'react-icons/io5'
import { MdOutlineMenuBook } from 'react-icons/md'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import MangaIcon from './MangaIcon/MangaIcon'
interface Props {
  type: SyncroItemType
  color?: string
  size?: number
}

export const SyncroItemBaseIcon: Record<
  SyncroItemType,
  React.ComponentType<IconBaseProps>
> = {
  book: MdOutlineMenuBook,
  game: IoLogoGameControllerA,
  manga: MangaIcon,
  movie: FiFilm,
  music: IoMusicalNotesSharp,
  tvSeries: FiTv,
  goodreadsBook: MdOutlineMenuBook,
}

const SyncroItemIcon = (props: Props) => {
  const { colors } = useMantineTheme()

  const { type, color = colors.dark[0], size = 16 } = props

  const Component = SyncroItemBaseIcon[type]

  return <Component size={size} color={color} />
}

export default SyncroItemIcon
