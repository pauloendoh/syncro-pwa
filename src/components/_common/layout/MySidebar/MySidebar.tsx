import { Center, Navbar, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import MyNextLink from '../../overrides/MyNextLink'
import Span from '../../text/Span'
import { useSidebarLinks } from './useSidebarLinks/useSidebarLinks'

type Props = {}

const MySidebar = ({ ...props }: Props) => {
  const { isMobile, screenWidth } = useMyMediaQuery()

  const router = useRouter()
  const theme = useMantineTheme()

  const sidebarLinks = useSidebarLinks()

  const { authUser } = useAuthStore()

  if (isMobile || !authUser) {
    return null
  }

  const isReduced = screenWidth <= 1200

  return (
    <Navbar
      width={{ base: isReduced ? 80 : 300 }}
      px={isReduced ? 0 : 32}
      py={24}
    >
      <FlexCol gap={24} align="center">
        {sidebarLinks.map((item) => (
          <MyNextLink href={item.href} key={item.href}>
            <FlexVCenter gap={16}>
              <Center w={40}>
                <item.Icon />
              </Center>
              {isReduced ? null : <Span size={16}>{item.text}</Span>}
            </FlexVCenter>
          </MyNextLink>
        ))}
      </FlexCol>
    </Navbar>
  )
}

export default MySidebar
