import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Button, Flex } from '@mantine/core'
import { IsEmail, IsString } from 'class-validator'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthUserGetDto } from '../../../domains/auth/types/AuthUserGetDto'
import useAuthStore from '../../../domains/auth/useAuthStore'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import FlexCol from '../../_common/flex/FlexCol'
import MyTextInput from '../../_common/inputs/MyTextInput'

class ISignUpDto {
  @IsString()
  username: string

  @IsEmail()
  email: string

  @IsString()
  password1: string

  @IsString()
  password2: string
}

interface Props {
  onToggleForm: () => void
}

const resolver = classValidatorResolver(ISignUpDto)

const RegisterForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpDto>({
    resolver,
  })

  const [loading, setLoading] = useState(false)
  const axios = useAxios()

  const { setAuthUser } = useAuthStore()

  const onSubmit = (data: ISignUpDto) => {
    // const pushToken = await nookies(null, ) AsyncStorage.getItem(storageKeys.pushToken)

    try {
      setLoading(true)
      const res = axios
        .post<AuthUserGetDto>(urls.api.register(''), data)
        .then((res) => {
          setLoading(false)
          setAuthUser(res.data)
          myNotifications.success('Success')
        })
    } catch (err: unknown) {
      console.log({ err })
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

          <Flex align="center" justify="space-between" mt={16}>
            <Button type="submit" loading={loading}>
              Register
            </Button>
            {JSON.stringify(errors)}

            <Button variant="subtle" onClick={props.onToggleForm}>
              Login
            </Button>
          </Flex>
        </FlexCol>
      </form>
    </>
  )
}

export default RegisterForm
