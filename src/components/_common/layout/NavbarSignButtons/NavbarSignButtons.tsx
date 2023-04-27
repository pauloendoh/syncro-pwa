import { Button } from '@mantine/core'
import { urls } from '../../../../utils/urls'
import FlexVCenter from '../../flex/FlexVCenter'
import MyNextLink from '../../overrides/MyNextLink'

type Props = {}

const NavbarSignButtons = (props: Props) => {
  return (
    <FlexVCenter>
      <MyNextLink href={urls.pages.index}>
        <Button variant="subtle" color="dark">
          Log In
        </Button>
      </MyNextLink>
      <MyNextLink href={urls.pages.signUp}>
        <Button color="secondary">Sign Up</Button>
      </MyNextLink>
    </FlexVCenter>
  )
}

export default NavbarSignButtons
