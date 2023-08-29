import { Text } from '@mantine/core'
import { isEmail } from 'class-validator'
import { useState } from 'react'
import usePasswordResetStore from '../../../../hooks/zustand/usePasswordResetStore'
import { urls } from '../../../../utils/urls/urls'
import { useAxios } from '../../../../utils/useAxios'
import FlexCol from '../../../_common/flex/FlexCol'
import MyTextInput from '../../../_common/inputs/MyTextInput'
import MyLoadingButton from '../../../_common/overrides/MyLoadingButton'

interface Props {
  goNext: () => void
}

const SendEmailCodeForm = (props: Props) => {
  const [email, setEmail] = usePasswordResetStore((s) => [s.email, s.setEmail])

  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const axios = useAxios()

  const submit = () => {
    setIsLoading(true)
    axios
      .post<boolean>(urls.api.sendPasswordResetEmail, { email })
      .then(() => {
        setSent(true)
        props.goNext()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <FlexCol align={'center'} gap={16}>
        <Text size={'md'} weight="bold">
          Password Reset
        </Text>

        <Text align={'center'}>
          Tell us your email associated with Syncro and we’ll send a code to
          reset your password.
        </Text>

        <FlexCol w="100%">
          <MyTextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            autoFocus
            placeholder="Email"
            w="100%"
          />

          <MyLoadingButton
            type="submit"
            disabled={!isEmail(email)}
            width="100%"
            mt={8}
            // onPress={handleSubmit(onSubmit)}
            color={!isEmail(email) ? 'gray' : 'primary'}
            loading={isLoading}
          >
            Send Code
          </MyLoadingButton>
        </FlexCol>
      </FlexCol>
    </form>
  )
}

export default SendEmailCodeForm
