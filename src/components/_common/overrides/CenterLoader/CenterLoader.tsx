import { Center, Loader, MantineNumberSize } from '@mantine/core'

type Props = {
  height?: number
  width?: string | number
  mt?: number
  loaderSize?: MantineNumberSize
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
      <Loader size={props.loaderSize} />
    </Center>
  )
}

export default CenterLoader
