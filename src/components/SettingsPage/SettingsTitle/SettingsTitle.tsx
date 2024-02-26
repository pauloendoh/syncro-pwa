import { Menu, Title } from '@mantine/core'
import { useMemo } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import {
  SettingsPageType,
  settingsPageOptions,
} from '../../../utils/urls/types/SettingsPageType'
import { urls } from '../../../utils/urls/urls'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyNextLink from '../../_common/overrides/MyNextLink'
import Span from '../../_common/text/Span'

type Props = {
  page: SettingsPageType
}

const SettingsTitle = ({ ...props }: Props) => {
  const title = useMemo(() => {
    const mapped: {
      [key in SettingsPageType]: string
    } = {
      account: 'Account',
      notifications: 'Notifications',
      'import-ratings': 'Import ratings',
    }

    return mapped[props.page] ?? 'Settings'
  }, [props.page])
  const { isMobile } = useMyMediaQuery()
  if (!isMobile) {
    return <Title order={4}>{title}</Title>
  }
  return (
    <Menu withArrow position="bottom">
      <Menu.Target>
        <FlexVCenter w="fit-content" gap={8}>
          <Span>{title}</Span>
          <MdArrowDropDown />
        </FlexVCenter>
      </Menu.Target>

      <Menu.Dropdown>
        {settingsPageOptions.map((page) => (
          <MyNextLink href={urls.pages.settings(page.value)}>
            <Menu.Item icon={<page.icon />}>{page.label}</Menu.Item>
          </MyNextLink>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

export default SettingsTitle
