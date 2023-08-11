import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Box, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { format } from 'timeago.js'
import useKeepTempUserMutation from '../../../../hooks/react-query/auth/useKeepTempUserMutation'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { RegisterDto } from '../../../LandingPage/RegisterForm/RegisterForm'
import FlexCol from '../../../_common/flex/FlexCol'
import MyTextInput from '../../../_common/inputs/MyTextInput'
import Span from '../../../_common/text/Span'

type Props = {}

const resolver = classValidatorResolver(RegisterDto)

const KeepUserForm = ({ ...props }: Props) => {
  const { authUser } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver,
  })

  const { mutate, isLoading } = useKeepTempUserMutation()

  const onSubmit = (data: RegisterDto) => {
    // const pushToken = await nookies(null, ) AsyncStorage.getItem(storageKeys.pushToken)

    mutate(
      { dto: data },
      {
        onSuccess: (data) => {},
      }
    )
  }

  return (
    <Box className="KeepUserForm" w={200}>
      {!!authUser?.userExpiresAt && (
        <Span>
          Your temporary account expires {format(authUser?.userExpiresAt)}
        </Span>
      )}

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
            <Button type="submit" loading={isLoading} fullWidth>
              KEEP ACCOUNT
            </Button>
          </FlexCol>
        </FlexCol>
      </form>
    </Box>
  )
}

export default KeepUserForm
