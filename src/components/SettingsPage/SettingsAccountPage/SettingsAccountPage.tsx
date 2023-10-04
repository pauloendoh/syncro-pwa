import { Box } from '@mantine/core'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import SettingsLayout from '../SettingsLayout/SettingsLayout'
import SettingsTitle from '../SettingsTitle/SettingsTitle'
import ChangeScoringSystemSection from './ChangeScoringSystemSection/ChangeScoringSystemSection'
import KeepUserForm from './KeepUserForm/KeepUserForm'

type Props = {}

const SettingsAccountPage = (props: Props) => {
  const { authUser } = useAuthStore()

  return (
    <SettingsLayout
      rightContent={
        <>
          <SettingsTitle page="account" />
          <Box mt={16}>
            {!!authUser?.userExpiresAt ? (
              <KeepUserForm />
            ) : (
              <ChangeScoringSystemSection />
            )}
          </Box>
        </>
      }
    />
  )
}

export default SettingsAccountPage
