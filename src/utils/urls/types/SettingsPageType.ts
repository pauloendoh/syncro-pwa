import { IconType } from 'react-icons'
import { MdImportExport, MdNotifications } from 'react-icons/md'
import { RiAccountCircleLine } from 'react-icons/ri'

export type SettingsPageType = 'import-ratings' | 'account' | 'notifications'

export const settingsPageOptions: {
  value: SettingsPageType
  label: string

  icon: IconType
}[] = [
  {
    value: 'account',
    label: 'Account',
    icon: RiAccountCircleLine,
  },
  {
    value: 'notifications',
    label: 'Notifications',
    icon: MdNotifications,
  },
  {
    value: 'import-ratings',
    label: 'Import Ratings',
    icon: MdImportExport,
  },
]
