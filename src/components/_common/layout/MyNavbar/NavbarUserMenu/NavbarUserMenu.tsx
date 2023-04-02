import { Menu } from '@mantine/core'
import { useLogout } from '../../../../../hooks/domains/auth/useLogout'
import { buildUserFeedbackDto } from '../../../../../hooks/react-query/feedback/types/UserFeedbackDto'
import { useMyFeedbackQuery } from '../../../../../hooks/react-query/feedback/useMyFeedbackQuery'
import { useUserInfoQuery } from '../../../../../hooks/react-query/user/useUserInfoQuery'
import useFeedbackModalStore from '../../../../../hooks/zustand/modals/useFeedbackModalStore'
import useAuthStore from '../../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../../utils/urls'
import MyNextLink from '../../../overrides/MyNextLink'

type Props = {}

const NavbarUserMenu = (props: Props) => {
  const { authUser } = useAuthStore()
  const logout = useLogout()

  const { data: userInfo } = useUserInfoQuery(authUser?.id || '')
  const { openModal: openFeedbackModal } = useFeedbackModalStore()
  const imageUrl =
    userInfo?.profile?.pictureUrl ||
    'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png'

  const { data: myFeedback } = useMyFeedbackQuery()

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
        <img
          alt="Picture of the user"
          src={imageUrl}
          width={36}
          height={36}
          style={{
            cursor: 'pointer',
            objectFit: 'cover',
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
        <MyNextLink href={urls.pages.savedItems('all')}>
          <Menu.Item>Planned items</Menu.Item>
        </MyNextLink>

        <MyNextLink href={urls.pages.settings}>
          <Menu.Item>Settings</Menu.Item>
        </MyNextLink>

        <Menu.Divider />

        <Menu.Item
          onClick={() => {
            openFeedbackModal(myFeedback || buildUserFeedbackDto())
          }}
        >
          Leave a feedback!
        </Menu.Item>

        <a
          href="https://discord.gg/gx3TKUYfrb"
          target="_blank"
          style={{
            textDecoration: 'none',
          }}
        >
          <Menu.Item>Join our Discord!</Menu.Item>
        </a>

        <Menu.Divider />

        <Menu.Item onClick={logout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default NavbarUserMenu
