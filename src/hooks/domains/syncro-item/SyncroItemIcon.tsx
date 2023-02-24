import { useMantineTheme } from '@mantine/core'
import { FiFilm, FiTv } from 'react-icons/fi'
import { IoLogoGameControllerA, IoMdBook } from 'react-icons/io'
import { SyncroItemType } from '../../../domains/syncro-item/SyncroItemType'
interface Props {
  type: SyncroItemType
  color?: string
  size?: number
}

const SyncroItemIcon = (props: Props) => {
  const { colors } = useMantineTheme()

  const { type, color = colors.dark[0], size = 16 } = props

  if (type === 'tvSeries') return <FiTv size={size} color={color} />

  if (type === 'game')
    return <IoLogoGameControllerA size={size} color={color} />

  if (type === 'movie') return <FiFilm size={size} color={color} />

  return <IoMdBook size={size} color={color} />
}

export default SyncroItemIcon
