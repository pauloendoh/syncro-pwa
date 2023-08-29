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

const ConfirmCodeForm = (props: Props) => {
  const [code, setCode, email] = usePasswordResetStore((s) => [
    s.code,
    s.setCode,
    s.email,
  ])

  const [isLoading, setIsLoading] = useState(false)

  const axios = useAxios()

  const submit = () => {
    setIsLoading(true)
    axios
      .post<boolean>(urls.api.confirmPasswordResetCode, { email, code })
      .then(() => {
        props.goNext()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form
      style={{
        width: '100%',
      }}
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <FlexCol align={'center'} w="100%" gap={16}>
        <Text size={'md'} weight="bold">
          Confirm your code
        </Text>

        <FlexCol w="100%" gap={8}>
          <MyTextInput
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoCapitalize="none"
            w="100%"
          />

          <MyLoadingButton
            type="submit"
            mt={4}
            disabled={code.length !== 6}
            width="100%"
            color={code.length !== 6 ? 'gray' : 'primary'}
            loading={isLoading}
          >
            Confirm Code
          </MyLoadingButton>
        </FlexCol>
      </FlexCol>
    </form>
  )
}

export default ConfirmCodeForm
