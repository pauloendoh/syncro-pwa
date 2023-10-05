import { Container, Grid, Header, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../utils/urls/urls'
import { zIndexes } from '../../../../utils/zIndexes'
import FlexVCenter from '../../flex/FlexVCenter'
import MyNextLink from '../../overrides/MyNextLink'
import NavbarSignButtons from '../NavbarSignButtons/NavbarSignButtons'
import NavbarRightIcons from './NavbarRightIcons/NavbarRightIcons'
import NavbarUserMenu from './NavbarUserMenu/NavbarUserMenu'
import SearchBar from './SearchBar/SearchBar'

type Props = {}

const MyNavbar = (props: Props) => {
  const { authUser } = useAuthStore()

  const { isSmallScreen } = useMyMediaQuery()

  const theme = useMantineTheme()

  const router = useRouter()
  const currentlyOnExplore = useMemo(() => {
    return router.pathname.startsWith('/explore')
  }, [router.pathname])

  return (
    <Header
      height={60}
      fixed
      zIndex={zIndexes.navbarFooter}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid
        sx={{
          width: '100%',
        }}
        align="center"
      >
        <Grid.Col span={2} xs={2} sm={'auto'} md={'auto'}>
          <MyNextLink
            href={urls.pages.index}
            style={{
              color: theme.colors.dark[0],
              display: 'inline-block',
            }}
          >
            <Title
              sx={(theme) => ({
                color: theme.colors.dark[0],
              })}
              order={2}
              ml={32}
              w="fit-content"
            >
              Syncro
            </Title>
          </MyNextLink>
        </Grid.Col>
        <Grid.Col span={4} xs={5} sm={6} md={6}>
          <Container size="xs" px={0}>
            <SearchBar />
          </Container>
        </Grid.Col>
        <Grid.Col span={6} xs={'auto'} sm={'auto'} md={'auto'}>
          <FlexVCenter gap={isSmallScreen ? 16 : 24} justify="flex-end">
            {!authUser && <NavbarSignButtons />}
            {authUser && (
              <FlexVCenter gap={isSmallScreen ? 16 : 24}>
                {/* <Tooltip label="Explore">
                  <div>
                    <MyNextLink href={urls.pages.explore()}>
                      <ActionIcon>
                        {currentlyOnExplore ? (
                          <IoCompass
                            size={24}
                            color={theme.colors.primary[9]}
                          />
                        ) : (
                          <IoCompassOutline size={24} />
                        )}
                      </ActionIcon>
                    </MyNextLink>
                  </div>
                </Tooltip> */}

                <NavbarRightIcons />
              </FlexVCenter>
            )}

            <NavbarUserMenu />
          </FlexVCenter>
        </Grid.Col>
      </Grid>
    </Header>
  )
}

export default MyNavbar
