import { ActionIcon, useMantineTheme } from '@mantine/core'
import { FaList, FaThList } from 'react-icons/fa'
import FlexVCenter from '../../_common/flex/FlexVCenter'

type Props = {
  value: 'md' | 'lg'
  onChange: (value: 'md' | 'lg') => void
}

const UserItemsViewSelector = ({ ...props }: Props) => {
  const theme = useMantineTheme()
  const selectedColor = theme.colors.secondary[9]
  return (
    <FlexVCenter className="UserItemsViewSelector" gap={8}>
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
    </FlexVCenter>
  )
}

export default UserItemsViewSelector
