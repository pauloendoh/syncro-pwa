import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import FlexCol from '../../_common/flex/FlexCol'
import DefaultLayout from '../../_common/layout/DefaultLayout'
import DatingMobileFooter from './DatingMobileFooter/DatingMobileFooter'
import MobileHeader from './MobileHeader/MobileHeader'

type Props = {
  children: React.ReactNode
  headerRightTitle?: React.ReactNode
}

const DatingLayout = ({ ...props }: Props) => {
  const { isMobile } = useMyMediaQuery()
  return (
    <DefaultLayout
      mustBeLoggedIn
      disableMarginBottom
      disableMarginTop
      overrideMobileFooter={<DatingMobileFooter />}
    >
      <MobileHeader
        title="Dating Profile"
        rightTitle={props.headerRightTitle}
      />
      <FlexCol p={16}>{props.children}</FlexCol>
    </DefaultLayout>
  )
}

export default DatingLayout
