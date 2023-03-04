import { Center, Loader } from '@mantine/core'

type Props = {}

const CenterLoader = (props: Props) => {
  return (
    <Center
      sx={{
        height: 80,
      }}
    >
      <Loader />
    </Center>
  )
}

export default CenterLoader
