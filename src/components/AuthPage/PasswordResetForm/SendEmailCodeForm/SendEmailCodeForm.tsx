import { Text } from '@mantine/core'
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
  const [identificator, setIdentificator] = usePasswordResetStore((s) => [
    s.identificator,
    s.setIdentificator,
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const axios = useAxios()

  const submit = () => {
    setIsLoading(true)
    axios
      .post<boolean>(urls.api.sendPasswordResetEmail, { email: identificator })
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
          Tell us your email or username associated with Syncro and we'll send a
          code to reset your password.
        </Text>

        <FlexCol w="100%">
          <MyTextInput
            value={identificator}
            onChange={(e) => setIdentificator(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            autoFocus
            placeholder="Email or username"
            w="100%"
          />

          <MyLoadingButton
            type="submit"
            disabled={identificator.trim().length < 3}
            width="100%"
            mt={8}
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
