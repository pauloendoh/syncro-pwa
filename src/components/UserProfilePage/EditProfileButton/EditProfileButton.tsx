import { Button } from '@mantine/core'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { urls } from '../../../utils/urls/urls'
import MyNextLink from '../../_common/overrides/MyNextLink'

type Props = {}

const EditProfileButton = ({ ...props }: Props) => {
  const { authUser } = useAuthStore()

  if (authUser?.userExpiresAt) {
    return (
      <MyNextLink
        href={urls.pages.settings('account')}
        style={{
          width: '100%',
        }}
      >
        <Button color="primary" fullWidth>
          Keep account to edit profile
        </Button>
      </MyNextLink>
    )
  }

  return (
    <MyNextLink
      href={urls.pages.editProfile}
      style={{
        width: '100%',
      }}
    >
      <Button color="gray" fullWidth>
        Edit profile
      </Button>
    </MyNextLink>
  )
}

export default EditProfileButton
