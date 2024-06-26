import {
  Box,
  Button,
  Container,
  Flex,
  Paper,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { MdImportExport, MdNotifications } from 'react-icons/md'
import { RiAccountCircleLine } from 'react-icons/ri'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { urls } from '../../../utils/urls/urls'
import FlexCol from '../../_common/flex/FlexCol'
import DefaultLayout from '../../_common/layout/DefaultLayout'
import MyNextLink from '../../_common/overrides/MyNextLink'

type Props = {
  rightContent: React.ReactNode
}

const SettingsLayout = (props: Props) => {
  const theme = useMantineTheme()
  const router = useRouter()

  const { isMobile } = useMyMediaQuery()

  return (
    <DefaultLayout>
      <Container size="md" px={isMobile ? 0 : undefined}>
        <Paper
          sx={{
            flexGrow: 1,
          }}
        >
          <Flex
            sx={{
              flexGrow: 1,
            }}
          >
            {!isMobile && (
              <FlexCol
                p={16}
                sx={{
                  background: theme.colors.dark[5],
                  width: 240,
                }}
              >
                <Title order={4}>Settings</Title>

                <FlexCol
                  mt={16}
                  sx={{
                    a: {
                      width: '100% !important',
                    },
                    button: {
                      display: 'flex',
                    },
                  }}
                >
                  <MyNextLink href={urls.pages.settings('account')}>
                    <Button
                      variant={
                        router.pathname === urls.pages.settings('account')
                          ? 'filled'
                          : 'subtle'
                      }
                      color="dark"
                      leftIcon={<RiAccountCircleLine />}
                      fullWidth
                    >
                      Account
                    </Button>
                  </MyNextLink>

                  <MyNextLink href={urls.pages.settings('notifications')}>
                    <Button
                      color={'dark'}
                      leftIcon={<MdNotifications />}
                      fullWidth
                      variant={
                        router.pathname === urls.pages.settings('notifications')
                          ? 'filled'
                          : 'subtle'
                      }
                    >
                      Notifications
                    </Button>
                  </MyNextLink>

                  <MyNextLink href={urls.pages.settings('import-ratings')}>
                    <Button
                      variant={
                        router.pathname ===
                        urls.pages.settings('import-ratings')
                          ? 'filled'
                          : 'subtle'
                      }
                      color="dark"
                      leftIcon={<MdImportExport />}
                      fullWidth
                    >
                      Import ratings
                    </Button>
                  </MyNextLink>
                </FlexCol>
              </FlexCol>
            )}

            <Box
              pt={isMobile ? 0 : 16}
              pb={isMobile ? 0 : 16}
              px={24}
              sx={{
                background: isMobile ? undefined : theme.colors.dark[9],
                flexGrow: 1,
              }}
            >
              {props.rightContent}
            </Box>
          </Flex>
        </Paper>
      </Container>
    </DefaultLayout>
  )
}

export default SettingsLayout
