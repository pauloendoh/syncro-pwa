import { Box, Title, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useSettingsQuery } from '../../../hooks/react-query/user-settings/useSettingsQuery'
import useUpdateSettingsMutation from '../../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import { ScoringSystem } from '../../../types/domain/rating/ScoringSystem'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import SettingsLayout from '../SettingsLayout/SettingsLayout'
import ScoringSystemSelector from './ScoringSystemSelector/ScoringSystemSelector'

type Props = {}

const SettingsAccountPage = (props: Props) => {
  const { data: settings } = useSettingsQuery()

  const [localScoringSystem, setLocalScoringSystem] = useState<ScoringSystem>()

  useEffect(() => {
    if (settings && !localScoringSystem) {
      setLocalScoringSystem(settings.scoringSystem)
    }
  }, [settings])

  const theme = useMantineTheme()

  const { mutate: submitNewSettings } = useUpdateSettingsMutation()
  useEffect(() => {
    if (
      localScoringSystem &&
      settings &&
      settings.scoringSystem !== localScoringSystem
    ) {
      submitNewSettings(
        {
          ...settings,
          scoringSystem: localScoringSystem,
        },
        {
          onSuccess: () => {
            myNotifications.success('Scoring system updated successfully')
          },
        }
      )
    }
  }, [localScoringSystem])

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
            {!localScoringSystem ? (
              <CenterLoader height={60} />
            ) : (
              <ScoringSystemSelector
                value={localScoringSystem}
                onChange={(newScoringSystem) => {
                  setLocalScoringSystem(newScoringSystem)
                }}
              />
            )}
          </Box>
        </Box>
      }
    />
  )
}

export default SettingsAccountPage
