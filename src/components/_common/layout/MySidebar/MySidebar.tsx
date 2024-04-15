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
      <FlexCol
        align={isReduced ? 'center' : 'flex-start'}
        sx={{
          '> a': {
            background: 'transparent',
            borderRadius: isReduced ? undefined : 8,
            '&:hover': {
              background: theme.colors.dark[5],
            },
            width: '100% !important',
            paddingBlock: 16,
            paddingInline: 8,
          },
        }}
      >
        {sidebarLinks.map((item, index) => {
          const component = (
            <FlexVCenter gap={16} justify={isReduced ? 'center' : 'flex-start'}>
              <Center w={40}>
                <item.Icon />
              </Center>
              {isReduced ? null : <Span size={16}>{item.text}</Span>}
            </FlexVCenter>
          )

          return (
            <MyNextLink
              href={item.href}
              key={item.href + index}
              onClick={(e) => {
                if (item.href === '#') {
                  e.preventDefault()
                  // simulate click on first button inside event target
                  // @ts-ignore
                  const span = e.target.querySelector('span')
                  if (span) {
                    span.click()
                    return
                  }

                  // @ts-ignore
                  const button = e.target.querySelector('button')
                  if (button) {
                    button.click()
                    return
                  }
                }
              }}
            >
              {component}
            </MyNextLink>
          )
        })}
      </FlexCol>
    </Navbar>
  )
}

export default MySidebar
