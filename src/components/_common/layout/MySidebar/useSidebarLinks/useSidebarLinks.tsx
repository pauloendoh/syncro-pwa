import { ActionIcon, Indicator, Tooltip, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { IoCompass, IoCompassOutline } from 'react-icons/io5'
import { MdHome, MdMail, MdMailOutline, MdOutlineHome } from 'react-icons/md'
import { useUnreadMessageRoomsQuery } from '../../../../../hooks/react-query/message/useUnreadMessageRoomsQuery'
import { useUserInfoQuery } from '../../../../../hooks/react-query/user/useUserInfoQuery'
import useAuthStore from '../../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../../utils/urls/urls'
import MyNextLink from '../../../overrides/MyNextLink'

export const useSidebarLinks = () => {
  const router = useRouter()
  const theme = useMantineTheme()

  const { data: unreadMessageRooms, isLoading } = useUnreadMessageRoomsQuery()
  const { authUser } = useAuthStore()
  const { data: userInfo } = useUserInfoQuery(authUser?.id || '')

  // PE 1/3 - DRY useProfileImage(userId)
  const imageUrl =
    userInfo?.profile?.pictureUrl ||
    'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png'

  const sidebarLinks = useMemo(() => {
    return [
      {
        href: urls.pages.index,
        text: 'Home',
        Icon: () =>
          router.asPath === urls.pages.index ? (
            <MdHome size={32} color={theme.colors.primary[9]} />
          ) : (
            <MdOutlineHome size={32} />
          ),
      },
      {
        href: urls.pages.explore(),
        text: 'Explore',
        Icon: () =>
          router.asPath.startsWith('/explore') ? (
            <IoCompass size={32} color={theme.colors.primary[9]} />
          ) : (
            <IoCompassOutline size={32} />
          ),
      },
      {
        href: urls.pages.messagesIndex,
        text: 'Messages',
        Icon: () => (
          <Tooltip
            label={
              unreadMessageRooms && unreadMessageRooms.length > 0
                ? 'Messages'
                : 'No messages'
            }
          >
            <Indicator
              disabled={isLoading || unreadMessageRooms?.length === 0}
              label={unreadMessageRooms?.length || 0}
              size={16}
              color="red"
            >
              <MyNextLink href={urls.pages.messagesIndex}>
                <ActionIcon>
                  {router.asPath.startsWith('/messages') ? (
                    <MdMail size={32} color={theme.colors.primary[9]} />
                  ) : (
                    <MdMailOutline size={32} />
                  )}
                </ActionIcon>
              </MyNextLink>
            </Indicator>
          </Tooltip>
        ),
      },
      {
        href: urls.pages.userProfile(authUser?.id || ''),
        text: authUser?.username,
        Icon: () => (
          <img
            alt="Picture of the user"
            src={imageUrl}
            width={32}
            height={32}
            style={{
              cursor: 'pointer',
              objectFit: 'cover',
              borderRadius: '50%',
              border: router.asPath.includes(
                urls.pages.userProfile(authUser?.id || '')
              )
                ? `3px solid ${theme.colors.primary[9]}`
                : 'none',
            }}
          />
        ),
      },
    ]
  }, [router.asPath, unreadMessageRooms?.length, isLoading])

  return sidebarLinks
}
