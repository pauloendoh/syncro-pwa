import { useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { MdExplore, MdHome, MdSearch } from 'react-icons/md'
import { useUserInfoQuery } from '../../../../../hooks/react-query/user/useUserInfoQuery'
import useAuthStore from '../../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../../utils/urls'
import UserImage from '../../../image/SyncroItemImage/UserImage/UserImage'

type Option = {
  icon: React.ReactNode
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
      icon: <MdHome size={24} />,
      href: '/',
      label: 'Home',
      selectedIf: () => {
        return router.pathname === '/'
      },
    },
    {
      icon: <MdSearch size={24} />,
      href: '/search',
      label: 'Search',
      selectedIf: () => {
        return router.pathname === '/search'
      },
    },
    {
      icon: <MdExplore size={24} />,
      href: urls.pages.explore('popular-users'),
      label: 'Explore',
      selectedIf: () => {
        return router.pathname.startsWith('/explore')
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
          <UserImage
            username={authUser?.username}
            pictureUrl={userInfo?.profile.pictureUrl}
            widthHeight={24}
          />
        </div>
      ),
      href: urls.pages.user(authUser?.id!),
      label: 'Profile',
      selectedIf: () => {
        return router.pathname.startsWith('/user')
      },
    },
  ]
  return mobileFooterLinkOptions
}
