import { Center, useMantineTheme } from '@mantine/core'
import FlexVCenter from '../../../flex/FlexVCenter'

type Props = {
  value: number
  onChange: (value: number) => void
}

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const FeedbackNumberInput = (props: Props) => {
  const theme = useMantineTheme()
  return (
    <FlexVCenter gap={4}>
      {options.map((option, index) => (
        <Center
          key={index}
          onClick={() => {
            if (option !== props.value) {
              props.onChange(option)
              return
            }
            props.onChange(0)
          }}
          sx={{
            width: 32,
            height: 32,
            borderRadius: 4,
            border: `1px solid ${theme.colors.gray[5]}`,
            backgroundColor:
              option <= props.value ? theme.colors.secondary[9] : 'transparent',
            cursor: 'pointer',
          }}
        >
          {option}
        </Center>
      ))}
    </FlexVCenter>
  )
}

export default FeedbackNumberInput
