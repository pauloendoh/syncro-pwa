import { Header, Title } from '@mantine/core'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import SavedAndNotificationIcons from '../../_common/layout/MyNavbar/SavedNotificationIcons/SavedAndNotificationIcons'

type Props = {}

const MobileHomeHeader = (props: Props) => {
  return (
    <Header
      fixed
      height={64}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
      }}
    >
      <Title order={2}>Syncro</Title>
      <FlexVCenter gap={16}>
        <SavedAndNotificationIcons />
      </FlexVCenter>
    </Header>
  )
}

export default MobileHomeHeader
