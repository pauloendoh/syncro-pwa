import { ActionIcon, useMantineTheme } from '@mantine/core'
import { BsFillGridFill } from 'react-icons/bs'
import { FaList, FaThList } from 'react-icons/fa'
import FlexVCenter from '../../_common/flex/FlexVCenter'

type Props = {
  value: 'md' | 'lg' | 'grid'
  onChange: (value: 'md' | 'lg' | 'grid') => void
}

const UserItemsViewSelector = ({ ...props }: Props) => {
  const theme = useMantineTheme()
  const selectedColor = theme.colors.secondary[9]
  return (
    <FlexVCenter className="UserItemsViewSelector">
      <ActionIcon onClick={() => props.onChange('md')}>
        <FaList
          style={{
            color: props.value === 'md' ? selectedColor : undefined,
          }}
        />
      </ActionIcon>

      <ActionIcon onClick={() => props.onChange('lg')}>
        <FaThList
          style={{
            color: props.value === 'lg' ? selectedColor : undefined,
          }}
        />
      </ActionIcon>

      <ActionIcon onClick={() => props.onChange('grid')}>
        <BsFillGridFill
          style={{
            color: props.value === 'grid' ? selectedColor : undefined,
          }}
        />
      </ActionIcon>
    </FlexVCenter>
  )
}

export default UserItemsViewSelector
