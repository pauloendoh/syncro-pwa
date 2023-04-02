import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Paper,
  Table,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { MdEmail, MdNotifications } from 'react-icons/md'
import { useSettingsQuery } from '../../hooks/react-query/user-settings/useSettingsQuery'
import useUpdateSettingsMutation from '../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'

type Props = {}

const SettingsPage = (props: Props) => {
  const { q, type } = useMyRouterQuery()

  const { isMobile: isXsScreen } = useMyMediaQuery()

  const { data: settings } = useSettingsQuery()

  const [localSettings, setLocalSettings] = useState(settings)

  useEffect(() => {
    if (!localSettings && settings) {
      setLocalSettings(settings)
    }
  }, [settings])

  const [debouncedSettings] = useDebouncedValue(localSettings, 500)

  const { mutate } = useUpdateSettingsMutation()

  useEffect(() => {
    if (debouncedSettings) {
      mutate(debouncedSettings)
    }
  }, [debouncedSettings])

  const theme = useMantineTheme()
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

              <FlexCol mt={24}>
                <Button color="dark" leftIcon={<MdNotifications />}>
                  Notifications
                </Button>
              </FlexCol>
            </FlexCol>

            <Box
              p={16}
              sx={{
                background: theme.colors.dark[9],
                flexGrow: 1,
              }}
            >
              <Title order={4}>Notifications</Title>

              <Table
                sx={{
                  marginTop: 24,
                  // 1st td
                  'tbody > tr > td:first-child': {
                    paddingLeft: 0,
                  },
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        paddingLeft: 0,
                        width: 300,
                      }}
                    >
                      Send notifications about
                    </th>
                    <th
                      style={{
                        width: 80,
                      }}
                    >
                      <FlexVCenter gap={4}>
                        <MdEmail />
                        <span>Email</span>
                      </FlexVCenter>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>User is following you</td>
                    <td>
                      <Checkbox
                        checked={!!localSettings?.emailUserIsFollowingYou}
                        onChange={(e) => {
                          if (!localSettings) return
                          setLocalSettings({
                            ...localSettings,
                            emailUserIsFollowingYou: e.currentTarget.checked,
                          })
                        }}
                        styles={{
                          body: {
                            justifyContent: 'center',
                          },

                          input: {
                            cursor: 'pointer',
                          },
                        }}
                      />
                    </td>
                    <td />
                  </tr>
                  {/* <tr>
                    <td>Direct messages</td>
                    <td align="center">
                      <Checkbox
                        checked={!!localSettings?.emailDirectMessage}
                        onChange={(e) => {
                          if (!localSettings) return
                          setLocalSettings({
                            ...localSettings,
                            emailDirectMessage: e.currentTarget.checked,
                          })
                        }}
                        styles={{
                          body: {
                            justifyContent: 'center',
                          },
                          input: {
                            cursor: 'pointer',
                          },
                        }}
                      />
                    </td>
                    <td />
                  </tr> */}
                  <tr>
                    <td>Items recommendations</td>
                    <td align="center">
                      <Checkbox
                        checked={
                          localSettings?.emailUserRecommendedItem === 'realTime'
                        }
                        onChange={(e) => {
                          if (!localSettings) return
                          setLocalSettings({
                            ...localSettings,
                            emailUserRecommendedItem: e.currentTarget.checked
                              ? 'realTime'
                              : 'off',
                          })
                        }}
                        styles={{
                          body: {
                            justifyContent: 'center',
                          },
                          input: {
                            cursor: 'pointer',
                          },
                        }}
                      />
                    </td>
                    <td />
                  </tr>
                </tbody>
              </Table>
            </Box>
          </Flex>
        </Paper>
      </Container>
    </LoggedLayout>
  )
}

export default SettingsPage
