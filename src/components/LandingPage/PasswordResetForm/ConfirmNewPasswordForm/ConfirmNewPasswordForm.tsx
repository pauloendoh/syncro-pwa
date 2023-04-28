import { Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import usePasswordResetStore from '../../../../hooks/zustand/usePasswordResetStore'
import { myNotifications } from '../../../../utils/mantine/myNotifications'
import { urls } from '../../../../utils/urls'
import { useAxios } from '../../../../utils/useAxios'
import FlexCol from '../../../_common/flex/FlexCol'
import MyTextInput from '../../../_common/inputs/MyTextInput'
import MyLoadingButton from '../../../_common/overrides/MyLoadingButton'

interface Props {
  goNext: () => void
}

const ConfirmNewPasswordForm = (props: Props) => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [code, email] = usePasswordResetStore((s) => [s.code, s.email])

  const [isLoading, setIsLoading] = useState(false)

  const axios = useAxios()

  const submit = () => {
    setIsLoading(true)
    axios
      .post<boolean>(urls.api.endPasswordReset, { email, code, password })
      .then(() => {
        myNotifications.success('New password saved!')
        props.goNext()
      })
      .finally(() => setIsLoading(false))
  }

  const buttonDisabled = useMemo(() => {
    if (!password || !password2 || password !== password2) return true

    return false
  }, [password, password2])

  return (
    <FlexCol align="center" w="100%">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <Text size={'md'} weight="bold">
          Confirm your new password
        </Text>

        <MyTextInput
          mt={24}
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoCapitalize="none"
          autoComplete="password"
          type="password"
          w="100%"
        />

        <MyTextInput
          mt={8}
          label="Confirm password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          autoCapitalize="none"
          autoComplete="password"
          type="password"
          w="100%"
        />

        <MyLoadingButton
          type="submit"
          mt={16}
          disabled={buttonDisabled}
          width="100%"
          color={buttonDisabled ? 'gray' : 'primary'}
          loading={isLoading}
        >
          Reset Password
        </MyLoadingButton>
      </form>
    </FlexCol>
  )
}

export default ConfirmNewPasswordForm
