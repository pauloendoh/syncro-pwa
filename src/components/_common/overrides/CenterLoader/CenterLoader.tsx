import { Center, Loader } from '@mantine/core'

type Props = {
  height?: number
  width?: string | number
  mt?: number
}

const CenterLoader = (props: Props) => {
  return (
    <Center
      mt={props.mt}
      sx={{
        height: props.height ?? '100%',
        width: props.width ?? '100%',
      }}
    >
      <Loader />
    </Center>
  )
}

export default CenterLoader
