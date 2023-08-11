import { Box, Title, useMantineTheme } from '@mantine/core'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import SettingsLayout from '../SettingsLayout/SettingsLayout'
import ChangeScoringSystemSection from './ChangeScoringSystemSection/ChangeScoringSystemSection'
import KeepUserForm from './KeepUserForm/KeepUserForm'

type Props = {}

const SettingsAccountPage = (props: Props) => {
  const theme = useMantineTheme()

  const { authUser } = useAuthStore()

  return (
    <SettingsLayout
      rightContent={
        <Box
          p={16}
          sx={{
            background: theme.colors.dark[9],
            flexGrow: 1,
          }}
        >
          <Title order={4}>Account</Title>
          <Box mt={24}>
            {!!authUser?.userExpiresAt ? (
              <KeepUserForm />
            ) : (
              <ChangeScoringSystemSection />
            )}
          </Box>
        </Box>
      }
    />
  )
}

export default SettingsAccountPage
