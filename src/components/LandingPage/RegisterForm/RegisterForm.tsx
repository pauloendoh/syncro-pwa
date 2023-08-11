import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Button, Text } from '@mantine/core'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import FlexCol from '../../_common/flex/FlexCol'
import MyTextInput from '../../_common/inputs/MyTextInput'

export class RegisterDto {
  @IsString({ message: 'Username is required.' })
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @MaxLength(16, { message: 'Username must have at most 16 characters.' })
  username: string

  @IsEmail(undefined, { message: 'Email is required.' })
  email: string

  @IsString({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must have at least 6 characters.' })
  password1: string

  @IsString({ message: 'Password2 is required.' })
  @MinLength(6, { message: 'Password2 must have at least 6 characters.' })
  password2: string
}

interface Props {
  onToggleForm: () => void
}

const resolver = classValidatorResolver(RegisterDto)

const RegisterForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver,
  })

  const [loading, setLoading] = useState(false)
  const axios = useAxios()

  const { setAuthUser } = useAuthStore()

  const onSubmit = (data: RegisterDto) => {
    // const pushToken = await nookies(null, ) AsyncStorage.getItem(storageKeys.pushToken)

    try {
      setLoading(true)
      const res = axios
        .post<AuthUserGetDto>(urls.api.register(''), data)
        .then((res) => {
          setAuthUser(res.data)
          myNotifications.success('Success')
        })
        .finally(() => setLoading(false))
    } catch (err: unknown) {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexCol mt={16} gap={8}>
          <MyTextInput
            label="Username"
            {...register('username')}
            error={errors.username?.message?.toString()}
          />
          <MyTextInput
            label="Email"
            {...register('email')}
            error={errors.email?.message?.toString()}
          />
          <MyTextInput
            label="Password"
            type="password"
            {...register('password1')}
            error={errors.password1?.message}
          />
          <MyTextInput
            label="Confirm Password"
            type="password"
            {...register('password2')}
            error={errors.password2?.message}
          />

          <FlexCol align="center" mt={16} gap={16}>
            <Button type="submit" loading={loading} fullWidth>
              CREATE ACCOUNT
            </Button>

            <Text component="span" size="sm" align="center">
              Already have an account? <br />
              <Text
                component="span"
                color="primary"
                underline
                onClick={props.onToggleForm}
                sx={{
                  cursor: 'pointer',
                }}
              >
                Log in
              </Text>
            </Text>
          </FlexCol>
        </FlexCol>
      </form>
    </>
  )
}

export default RegisterForm
