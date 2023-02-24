import { Header, Title } from '@mantine/core'
import useAuthStore from '../../../../domains/auth/useAuthStore'
import { useLogout } from '../../../../hooks/domains/auth/useLogout'
import { urls } from '../../../../utils/urls'
import NextLink from '../../overrides/NextLink'
import NavbarUserMenu from './NavbarUserMenu/NavbarUserMenu'

type Props = {}

const MyNavbarHeader = (props: Props) => {
  const { authUser } = useAuthStore()

  const logout = useLogout()

  return (
    <Header
      height={60}
      px={17}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.dark[9],
        borderBottom: `1px solid ${theme.colors.dark[5]}`,
      })}
      fixed
    >
      <NextLink href={urls.pages.index}>
        <Title
          sx={(theme) => ({
            color: theme.colors.dark[0],
          })}
          order={2}
        >
          Syncro
        </Title>
      </NextLink>
      <NavbarUserMenu />
    </Header>
  )
}

export default MyNavbarHeader
