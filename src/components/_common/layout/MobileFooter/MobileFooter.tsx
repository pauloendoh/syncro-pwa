import { Footer } from '@mantine/core'

type Props = {}

const MobileFooter = (props: Props) => {
  return (
    <Footer
      height={60}
      fixed
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      footer :D
    </Footer>
  )
}

export default MobileFooter
