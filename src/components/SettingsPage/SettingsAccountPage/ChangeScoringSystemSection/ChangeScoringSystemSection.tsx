import { useEffect, useState } from 'react'
import { useSettingsQuery } from '../../../../hooks/react-query/user-settings/useSettingsQuery'
import useUpdateSettingsMutation from '../../../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import { ScoringSystem } from '../../../../types/domain/rating/ScoringSystem'
import { myNotifications } from '../../../../utils/mantine/myNotifications'
import CenterLoader from '../../../_common/overrides/CenterLoader/CenterLoader'
import ScoringSystemSelector from '../ScoringSystemSelector/ScoringSystemSelector'

type Props = {}

const ChangeScoringSystemSection = ({ ...props }: Props) => {
  const [localScoringSystem, setLocalScoringSystem] = useState<ScoringSystem>()

  const { data: settings } = useSettingsQuery()

  const { mutate: submitNewSettings } = useUpdateSettingsMutation()

  useEffect(() => {
    if (settings && !localScoringSystem) {
      setLocalScoringSystem(settings.scoringSystem)
    }
  }, [settings])

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
    <>
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
    </>
  )
}

export default ChangeScoringSystemSection
