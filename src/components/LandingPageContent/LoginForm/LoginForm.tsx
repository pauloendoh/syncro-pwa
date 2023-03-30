import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Button, Text } from '@mantine/core'
import { IsString } from 'class-validator'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyTextInput from '../../_common/inputs/MyTextInput'
import MyTextLink from '../../_common/text/MyTextLink/MyTextLink'

class LoginDto {
  @IsString()
  identificator: string

  @IsString()
  password: string
}

interface Props {
  onToggleForm: () => void
  onClickResetPassword: () => void
}

const resolver = classValidatorResolver(LoginDto)

const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver,
  })

  const axios = useAxios()
  const [loading, setLoading] = useState(false)

  const { setAuthUser } = useAuthStore()

  const onSubmit = async (data: LoginDto) => {
    setLoading(true)

    // const pushToken = await nookies.get(storageKeys.pushToken)

    axios
      .post<AuthUserGetDto>(urls.api.login(''), data)
      .then((res) => {
        myNotifications.success('Signed in')
        // allow decorators

        setAuthUser(res.data)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexCol mt={16} gap={8}>
          <MyTextInput
            label="Username or email"
            {...register('identificator')}
            error={errors.identificator?.message}
          />

          <MyTextInput
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          <FlexVCenter justify={'flex-end'}>
            <MyTextLink size={13} onClick={props.onClickResetPassword}>
              Forgot your password?
            </MyTextLink>
          </FlexVCenter>
          <FlexCol align="center" mt={16} gap={16}>
            <Button type="submit" loading={loading} fullWidth>
              SIGN IN
            </Button>

            <Text component="span" size="sm" align="center">
              Don't have an account? <br />
              <Text
                component="span"
                color="primary"
                underline
                onClick={props.onToggleForm}
                sx={{
                  cursor: 'pointer',
                }}
              >
                Sign up
              </Text>
            </Text>
          </FlexCol>
        </FlexCol>
      </form>
    </>
  )
}

export default LoginForm
