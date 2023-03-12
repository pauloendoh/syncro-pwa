import { useRouter } from 'next/router'
import { MdExplore, MdHome, MdSearch } from 'react-icons/md'
import { RiUser3Fill } from 'react-icons/ri'
import useAuthStore from '../../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../../utils/urls'

type Option = {
  icon: React.ReactNode
  href: string
  label: string
  selectedIf: () => boolean
}

export const useMobileFooterLinkOptions = () => {
  const { authUser } = useAuthStore()

  const router = useRouter()

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
      icon: <RiUser3Fill size={24} />,
      href: urls.pages.user(authUser?.id!),
      label: 'Profile',
      selectedIf: () => {
        return router.pathname.startsWith('/user')
      },
    },
  ]
  return mobileFooterLinkOptions
}
