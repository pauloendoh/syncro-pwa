import { useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { IoBookmarks, IoBookmarksOutline } from 'react-icons/io5'
import {
  MdExplore,
  MdHome,
  MdOutlineExplore,
  MdOutlineHome,
  MdSearch,
} from 'react-icons/md'
import { useUserInfoQuery } from '../../../../../hooks/react-query/user/useUserInfoQuery'
import useAuthStore from '../../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../../utils/urls'
import UserImage from '../../../image/SyncroItemImage/UserImage/UserImage'

type Option = {
  icon: React.ReactNode
  selectedIcon: React.ReactNode
  href: string
  label: string
  selectedIf: () => boolean
}

export const useMobileFooterLinkOptions = () => {
  const { authUser } = useAuthStore()

  const router = useRouter()

  const { data: userInfo } = useUserInfoQuery(authUser?.id)

  const theme = useMantineTheme()

  const isAuthUserPage = useMemo(() => {
    return router.asPath.includes(urls.pages.user(authUser?.id!))
  }, [authUser, router.asPath])

  const mobileFooterLinkOptions: Option[] = [
    {
      icon: <MdOutlineHome size={24} />,
      selectedIcon: <MdHome size={24} />,
      href: '/',
      label: 'Home',
      selectedIf: () => {
        return router.pathname === '/'
      },
    },
    {
      icon: <MdSearch size={24} />,
      selectedIcon: <MdSearch size={24} />,
      href: '/search',
      label: 'Search',
      selectedIf: () => {
        return router.pathname === '/search'
      },
    },
    {
      icon: <MdOutlineExplore size={24} />,
      selectedIcon: <MdExplore size={24} />,
      href: urls.pages.explore(),
      label: 'Explore',
      selectedIf: () => {
        return router.pathname.startsWith('/explore')
      },
    },
    {
      icon: <IoBookmarksOutline size={24} />,
      selectedIcon: <IoBookmarks size={24} />,
      href: urls.pages.savedItems(),
      label: 'Planned items',
      selectedIf: () => {
        return router.pathname.startsWith('/saved')
      },
    },
    {
      icon: (
        <div
          style={{
            borderRadius: '50%',
            border: isAuthUserPage
              ? `2px solid ${theme.colors.primary[9]}`
              : undefined,
          }}
        >
          {userInfo && authUser && (
            <UserImage
              username={authUser.username}
              pictureUrl={userInfo.profile.pictureUrl}
              widthHeight={24}
            />
          )}
        </div>
      ),
      selectedIcon: null,
      href: urls.pages.user(authUser?.id!),
      label: 'Profile',
      selectedIf: () => router.pathname.startsWith('/user'),
    },
  ]
  return mobileFooterLinkOptions
}
