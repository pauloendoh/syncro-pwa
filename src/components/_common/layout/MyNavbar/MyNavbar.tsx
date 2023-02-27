import { ActionIcon, Header, Title, Tooltip } from '@mantine/core'
import { MdBookmark } from 'react-icons/md'
import { useLogout } from '../../../../hooks/domains/auth/useLogout'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../utils/urls'
import FlexVCenter from '../../flex/FlexVCenter'
import MyNextLink from '../../overrides/MyNextLink'
import NavbarUserMenu from './NavbarUserMenu/NavbarUserMenu'
import SearchBar from './SearchBar/SearchBar'

type Props = {}

const MyNavbar = (props: Props) => {
  const { authUser } = useAuthStore()

  const logout = useLogout()

  return (
    <Header
      height={60}
      px={32}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.dark[9],
        borderBottom: `1px solid ${theme.colors.dark[5]}`,
      })}
      fixed
    >
      <MyNextLink href={urls.pages.index}>
        <Title
          sx={(theme) => ({
            color: theme.colors.dark[0],
          })}
          order={2}
        >
          Syncro
        </Title>
      </MyNextLink>
      <SearchBar />

      <FlexVCenter gap={24}>
        {authUser && (
          <Tooltip label="Saved items" withArrow>
            <MyNextLink href={urls.pages.savedItems}>
              <ActionIcon>
                <MdBookmark size={24} />
              </ActionIcon>
            </MyNextLink>
          </Tooltip>
        )}

        <NavbarUserMenu />
      </FlexVCenter>
    </Header>
  )
}

export default MyNavbar
