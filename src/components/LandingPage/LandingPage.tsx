import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  useMantineTheme,
} from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { useMemo } from 'react'
import { FaGooglePlay } from 'react-icons/fa'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { urls } from '../../utils/urls/urls'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import SafariIosInstallButton from '../_common/layout/MyNavbar/NavbarRightIcons/InstallButton/SafariIosInstallButton/SafariIosInstallButton'
import MyNextLink from '../_common/overrides/MyNextLink'
import Span from '../_common/text/Span'
import LandingPageItemsSection from './LandingPageItemsSection/LandingPageItemsSection'

type Props = {}

const LandingPage = ({ ...props }: Props) => {
  const { isMobile } = useMyMediaQuery()

  const [scroll] = useWindowScroll()

  const headerBgColor = useMemo(() => {
    return `rgb(27 27 27 / ${scroll.y / 2}%) `
  }, [scroll.y])

  const theme = useMantineTheme()

  return (
    <Box
      className="LandingPage"
      sx={{
        header: {
          backgroundColor: headerBgColor,
        },
      }}
    >
      {/* fixed header */}
      <header
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <FlexVCenter w="100%" justify={'space-between'} px={16}>
          <Span></Span>
          <FlexVCenter gap={8}>
            <MyNextLink href={urls.pages.getSignIn()}>
              <Button variant="subtle" color="dark">
                Sign In
              </Button>
            </MyNextLink>
            <MyNextLink href={urls.pages.signUp()}>
              <Button color="secondary">Sign Up</Button>
            </MyNextLink>
          </FlexVCenter>
        </FlexVCenter>
      </header>

      <Center>
        <img
          src="/landing-page-cover.png"
          alt="Landing Page Cover"
          style={{
            width: 'clamp(300px,100%,1200px)',
          }}
        />
      </Center>
      <Box
        sx={{
          position: 'relative',
          top: isMobile ? -64 : -120,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container
          size="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Span
            size={isMobile ? '1.5rem' : '2.5rem'}
            weight={700}
            align="center"
          >
            Review everything.
            <br />
            Find recommendations.
            <br /> Share with your friends.
          </Span>
          <Span size="1.25rem" mt={16}>
            All in one place.
          </Span>
          <MyNextLink href={urls.pages.signUp()}>
            <Button color="secondary" size="lg" mt={24}>
              JOIN SYNCRO FOR FREE
            </Button>
          </MyNextLink>

          <FlexCol mt={isMobile ? 40 : 64} align="center" gap={16}>
            <Span size={isMobile ? '1.25rem' : '1.5rem'}>Get it on</Span>

            <FlexVCenter gap={32}>
              <a
                href={
                  'https://play.google.com/store/apps/details?id=app.vercel.syncro.twa'
                }
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <FlexCol align="center" gap={8}>
                  <FaGooglePlay fontSize={isMobile ? '1.5rem' : '2rem'} />
                  <Span size={'sm'}>Google Play</Span>
                </FlexCol>
              </a>
              <FlexCol align="center" gap={8}>
                <div
                  style={{
                    height: isMobile ? '1.5rem' : '2rem',
                  }}
                >
                  <SafariIosInstallButton
                    iconType="ios"
                    fontSize={isMobile ? '1.5rem' : '2rem'}
                  />
                </div>
                <Span size={'sm'}>iOS</Span>
              </FlexCol>
            </FlexVCenter>
          </FlexCol>

          <Divider
            mt={40}
            w="100%"
            label="Most rated this month"
            labelPosition="center"
            styles={{
              label: {
                fontSize: '1rem',
              },
            }}
          />

          <Box mt={24}>
            <LandingPageItemsSection />
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingPage
