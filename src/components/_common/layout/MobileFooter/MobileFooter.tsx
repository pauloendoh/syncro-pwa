import { Center, Footer, useMantineTheme } from '@mantine/core'
import MyNextLink from '../../overrides/MyNextLink'
import { useMobileFooterLinkOptions } from './mobileFooterLinkOptions/mobileFooterLinkOptions'

type Props = {}

const MobileFooter = (props: Props) => {
  const mobileFooterLinkOptions = useMobileFooterLinkOptions()

  const theme = useMantineTheme()
  return (
    <Footer
      height={60}
      fixed
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      {mobileFooterLinkOptions.map((option) => (
        <MyNextLink
          key={option.label}
          href={option.href}
          style={{
            color: option.selectedIf() ? theme.colors.primary[9] : 'gray',
          }}
        >
          <Center w={32} h={32}>
            {option.icon}
          </Center>
        </MyNextLink>
      ))}
    </Footer>
  )
}

export default MobileFooter
