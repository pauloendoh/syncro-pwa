import { Box, Title, useMantineTheme } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useSettingsQuery } from '../../../hooks/react-query/user-settings/useSettingsQuery'
import useUpdateSettingsMutation from '../../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import useImportRatingsModalStore from '../../../hooks/zustand/modals/useImportRatingsModalStore'
import FlexCol from '../../_common/flex/FlexCol'
import MyTextLink from '../../_common/text/MyTextLink/MyTextLink'
import SettingsLayout from '../SettingsLayout/SettingsLayout'

type Props = {}

const ImportRatingsPage = (props: Props) => {
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
  const { openModal } = useImportRatingsModalStore()
  return (
    <SettingsLayout
      rightContent={
        <Box>
          <Title order={4}>Import ratings</Title>
          <Box mt={16}>
            <FlexCol>
              <Box>
                <MyTextLink onClick={() => openModal('MAL-Anime')}>
                  MyAnimeList (anime & manga)
                </MyTextLink>
              </Box>
            </FlexCol>
          </Box>

          <Box mt={32}>{/* <ConnectorsSection /> */}</Box>
        </Box>
      }
    />
  )
}

export default ImportRatingsPage
