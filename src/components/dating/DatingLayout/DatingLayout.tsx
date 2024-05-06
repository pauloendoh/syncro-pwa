import DefaultLayout from '../../_common/layout/DefaultLayout'
import MobileHeader from './MobileHeader/MobileHeader'

type Props = {
  children: React.ReactNode
}

const DatingLayout = ({ ...props }: Props) => {
  return (
    <DefaultLayout mustBeLoggedIn disableMarginBottom disableMarginTop>
      <MobileHeader title="Dating Profile" />
      {props.children}
    </DefaultLayout>
  )
}

export default DatingLayout
