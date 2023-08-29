import { Box, useMantineTheme } from '@mantine/core'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import SettingsLayout from '../SettingsLayout/SettingsLayout'
import SettingsTitle from '../SettingsTitle/SettingsTitle'
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
            flexGrow: 1,
          }}
        >
          <SettingsTitle page="account" />
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
