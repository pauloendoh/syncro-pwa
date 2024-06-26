import { ActionIcon, Menu, useMantineTheme } from '@mantine/core'
import { CgMoreO } from 'react-icons/cg'
import { MdLogout, MdOutlineFeedback, MdSettings } from 'react-icons/md'
import { SiDiscord } from 'react-icons/si'
import { useLogout } from '../../../../../../hooks/domains/auth/useLogout'
import { buildUserFeedbackDto } from '../../../../../../hooks/react-query/feedback/types/UserFeedbackDto'
import { useMyFeedbackQuery } from '../../../../../../hooks/react-query/feedback/useMyFeedbackQuery'
import useFeedbackModalStore from '../../../../../../hooks/zustand/modals/useFeedbackModalStore'
import useAuthStore from '../../../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../../../utils/urls/urls'
import MyNextLink from '../../../../overrides/MyNextLink'

type Props = {
  useTextInsteadOfIcon?: string
}

const SidebarMoreMenu = (props: Props) => {
  const { authUser } = useAuthStore()
  const logout = useLogout()

  const { openModal: openFeedbackModal } = useFeedbackModalStore()

  const { data: myFeedback } = useMyFeedbackQuery()
  const theme = useMantineTheme()

  if (!authUser) return null

  return (
    <Menu
      shadow="md"
      styles={(theme) => ({
        item: {
          fontSize: 14,
        },
      })}
      position="right-start"
    >
      <Menu.Target>
        {props.useTextInsteadOfIcon ? (
          <span
            style={{
              cursor: 'pointer',
            }}
          >
            {props.useTextInsteadOfIcon}
          </span>
        ) : (
          <ActionIcon>
            <CgMoreO size={24} />
          </ActionIcon>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {!!authUser.userExpiresAt ? (
          <MyNextLink href={urls.pages.settings()}>
            <Menu.Item
              icon={<MdSettings />}
              sx={{
                color: theme.colors.primary[9],
              }}
            >
              Keep account
            </Menu.Item>
          </MyNextLink>
        ) : (
          <MyNextLink href={urls.pages.settings()}>
            <Menu.Item icon={<MdSettings />}>Settings</Menu.Item>
          </MyNextLink>
        )}

        <Menu.Divider />

        <Menu.Item
          onClick={() => {
            openFeedbackModal(myFeedback || buildUserFeedbackDto())
          }}
          icon={<MdOutlineFeedback />}
        >
          Leave a feedback
        </Menu.Item>

        <a
          href="https://discord.gg/gx3TKUYfrb"
          target="_blank"
          style={{
            textDecoration: 'none',
          }}
        >
          <Menu.Item icon={<SiDiscord />}>Join our Discord</Menu.Item>
        </a>

        <Menu.Divider />

        <Menu.Item
          onClick={logout}
          sx={(theme) => ({
            color: theme.colors.red[5],
          })}
          icon={<MdLogout />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default SidebarMoreMenu
