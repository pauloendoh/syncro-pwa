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
import { MdNotifications } from 'react-icons/md'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import LoggedLayout from '../../_common/layout/LoggedLayout'
import MyNextLink from '../../_common/overrides/MyNextLink'

type Props = {
  rightContent: React.ReactNode
}

const SettingsLayout = (props: Props) => {
  const theme = useMantineTheme()
  const router = useRouter()

  return (
    <LoggedLayout>
      <Container size="md">
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
            <FlexCol
              p={16}
              sx={{
                background: theme.colors.dark[5],
                width: 240,
              }}
            >
              <Title order={4}>Settings</Title>

              <FlexCol
                mt={24}
                sx={{
                  a: {
                    width: '100% !important',
                  },
                }}
              >
                <MyNextLink href={urls.pages.settings}>
                  <Button
                    color={'dark'}
                    leftIcon={<MdNotifications />}
                    fullWidth
                    variant={
                      router.pathname === urls.pages.settings
                        ? 'filled'
                        : 'subtle'
                    }
                  >
                    Notifications
                  </Button>
                </MyNextLink>

                {/* <MyNextLink href={urls.pages.importRatings}>
                  <Button
                    variant={
                      router.pathname === urls.pages.importRatings
                        ? 'filled'
                        : 'subtle'
                    }
                    color="dark"
                    leftIcon={<MdImportExport />}
                    fullWidth
                  >
                    Import ratings
                  </Button>
                </MyNextLink> */}
              </FlexCol>
            </FlexCol>

            <Box
              p={16}
              sx={{
                background: theme.colors.dark[9],
                flexGrow: 1,
              }}
            >
              {props.rightContent}
            </Box>
          </Flex>
        </Paper>
      </Container>
    </LoggedLayout>
  )
}

export default SettingsLayout
