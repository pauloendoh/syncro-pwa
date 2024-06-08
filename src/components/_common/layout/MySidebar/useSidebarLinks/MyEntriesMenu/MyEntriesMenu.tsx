import { ActionIcon, Menu } from '@mantine/core'
import { MdFormatListBulleted } from 'react-icons/md'
import { validSyncroItemTypeOptions } from '../../../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import useAuthStore from '../../../../../../hooks/zustand/useAuthStore'
import { urls } from '../../../../../../utils/urls/urls'
import SyncroItemIcon from '../../../../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import MyNextLink from '../../../../overrides/MyNextLink'

type Props = {
  useTextInsteadOfIcon?: string
}

const MyEntriesMenu = (props: Props) => {
  const { authUser } = useAuthStore()

  if (!authUser) return null

  return (
    <Menu
      shadow="md"
      styles={(theme) => ({
        item: {
          fontSize: 14,
        },
      })}
      position="right-start"
    >
      <Menu.Target>
        {props.useTextInsteadOfIcon ? (
          <span
            style={{
              cursor: 'pointer',
            }}
          >
            {props.useTextInsteadOfIcon}
          </span>
        ) : (
          <ActionIcon>
            <MdFormatListBulleted size={24} />
          </ActionIcon>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {validSyncroItemTypeOptions.map((option) => (
          <MyNextLink
            href={urls.pages.userItems(authUser.id, option.itemType)}
            key={option.itemType}
          >
            <Menu.Item icon={<SyncroItemIcon type={option.itemType} />}>
              {option.getTypeLabel(true)}
            </Menu.Item>
          </MyNextLink>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

export default MyEntriesMenu
