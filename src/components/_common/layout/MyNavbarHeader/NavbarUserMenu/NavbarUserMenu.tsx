import { Menu } from '@mantine/core'
import Image from 'next/image'
import useAuthStore from '../../../../../domains/auth/useAuthStore'
import { useLogout } from '../../../../../hooks/domains/auth/useLogout'
import { useUserInfoQuery } from '../../../../../hooks/react-query/user/useUserInfoQuery'
import { urls } from '../../../../../utils/urls'
import MyNextLink from '../../../overrides/MyNextLink'

type Props = {}

const NavbarUserMenu = (props: Props) => {
  const { authUser } = useAuthStore()
  const logout = useLogout()

  const { data: userInfo } = useUserInfoQuery(authUser?.id || '')
  const imageUrl =
    userInfo?.profile.pictureUrl ||
    'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png'

  if (!authUser) return null

  return (
    <Menu
      shadow="md"
      width={160}
      styles={(theme) => ({
        item: {
          fontSize: 14,
        },
      })}
      position="bottom-end"
    >
      <Menu.Target>
        <Image
          alt="Picture of the user"
          src={imageUrl}
          width={36}
          height={36}
          style={{
            cursor: 'pointer',
            borderRadius: '50%',
          }}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <MyNextLink
          href={urls.pages.user(authUser?.id || '')}
          style={{
            textDecoration: 'none',
          }}
        >
          <Menu.Item>Profile</Menu.Item>
        </MyNextLink>

        <Menu.Item onClick={logout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default NavbarUserMenu
