import { ActionIcon, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { MdSettings } from 'react-icons/md'
import { useSettingsQuery } from '../../../hooks/react-query/user-settings/useSettingsQuery'
import useFeedSettingsModal from '../../../hooks/zustand/modals/useFeedSettingsModal'

type Props = {}

const FeedSettingsIcon = ({ ...props }: Props) => {
  const { openModal } = useFeedSettingsModal()

  const { data: settings } = useSettingsQuery()

  const isActive = useMemo(() => {
    if (!settings) return false

    if (settings.feedMinimumRating > 0) return true
    if (settings.feedExcludeItemTypes.length > 0) return true
    if (settings.feedExcludeRatedOrPlanned) return true

    return false
  }, [settings])

  const theme = useMantineTheme()

  return (
    <ActionIcon onClick={openModal} className="FeedSettingsIcon">
      <MdSettings color={isActive ? theme.colors.secondary[6] : undefined} />
    </ActionIcon>
  )
}

export default FeedSettingsIcon
