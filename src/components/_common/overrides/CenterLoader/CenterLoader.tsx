import { Center, Loader } from '@mantine/core'

type Props = {
  height?: number
}

const CenterLoader = (props: Props) => {
  return (
    <Center
      sx={{
        height: props.height || 80,
      }}
    >
      <Loader />
    </Center>
  )
}

export default CenterLoader
