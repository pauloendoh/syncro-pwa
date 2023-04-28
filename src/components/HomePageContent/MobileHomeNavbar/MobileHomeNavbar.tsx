import { Header, Title } from '@mantine/core'
import { zIndexes } from '../../../utils/zIndexes'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import NavbarRightIcons from '../../_common/layout/MyNavbar/NavbarRightIcons/NavbarRightIcons'

const MobileHomeNavbar = () => {
  return (
    <Header
      fixed
      height={64}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: zIndexes.navbarFooter,
      }}
    >
      <Title order={2}>Syncro</Title>
      <FlexVCenter gap={16}>
        <NavbarRightIcons />
      </FlexVCenter>
    </Header>
  )
}

export default MobileHomeNavbar
