import { Box } from '@mantine/core'
import { useSettingsQuery } from '../../../hooks/react-query/user-settings/useSettingsQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexCol from '../../_common/flex/FlexCol'
import SettingsLayout from '../SettingsLayout/SettingsLayout'
import SettingsTitle from '../SettingsTitle/SettingsTitle'
import ChangeScoringSystemSection from './ChangeScoringSystemSection/ChangeScoringSystemSection'
import KeepUserForm from './KeepUserForm/KeepUserForm'
import MinRatingSharingSection from './MinRatingSharingSection/MinRatingSharingSection'

type Props = {}

const SettingsAccountPage = (props: Props) => {
  const { authUser } = useAuthStore()
  const { data: userSettings } = useSettingsQuery()

  return (
    <SettingsLayout
      rightContent={
        <>
          <SettingsTitle page="account" />
          <Box mt={16}>
            {!!authUser?.userExpiresAt ? (
              <KeepUserForm />
            ) : (
              <FlexCol>
                <ChangeScoringSystemSection />
                {userSettings && (
                  <MinRatingSharingSection initialSettings={userSettings} />
                )}
              </FlexCol>
            )}
          </Box>
        </>
      }
    />
  )
}

export default SettingsAccountPage
