import { Center, Loader } from '@mantine/core'

type Props = {
  height?: number
  width?: string | number
}

const CenterLoader = (props: Props) => {
  return (
    <Center
      sx={{
        height: props.height || 80,
        width: props.width,
      }}
    >
      <Loader />
    </Center>
  )
}

export default CenterLoader
