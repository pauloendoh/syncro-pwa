import { Center, Footer, useMantineTheme } from '@mantine/core'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { zIndexes } from '../../../../utils/zIndexes'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import LoggedOutMobileFooterContent from './LoggedOutMobileFooterContent/LoggedOutMobileFooterContent'
import { useMobileFooterLinkOptions } from './mobileFooterLinkOptions/mobileFooterLinkOptions'

const DatingMobileFooter = () => {
  const mobileFooterLinkOptions = useMobileFooterLinkOptions()

  const theme = useMantineTheme()
  const { authUser } = useAuthStore()

  return (
    <Footer
      height={60}
      fixed
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: zIndexes.navbarFooter,
      }}
    >
      {!authUser && <LoggedOutMobileFooterContent />}
      {!!authUser &&
        mobileFooterLinkOptions.map((option) => (
          <MyNextLink
            key={option.label}
            href={option.href}
            style={{
              color: option.selectedIf() ? theme.colors.primary[9] : 'gray',
            }}
          >
            <Center w={60} h={60}>
              {option.selectedIf() && option.selectedIcon
                ? option.selectedIcon
                : option.icon}
            </Center>
          </MyNextLink>
        ))}
      {}
    </Footer>
  )
}

export default DatingMobileFooter
