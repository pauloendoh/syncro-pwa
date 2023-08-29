import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { RegisterDto } from '../../../components/AuthPage/RegisterForm/RegisterForm'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { useLogout } from '../../domains/auth/useLogout'
import useAuthStore from '../../zustand/useAuthStore'

const useKeepTempUserMutation = () => {
  const { setAuthUser } = useAuthStore()
  const axios = useAxios()

  const logout = useLogout({ forceLogout: true })
  const router = useRouter()

  return useMutation(
    ({ dto }: { dto: RegisterDto }) =>
      axios
        .post<AuthUserGetDto>(urls.api.keepTempUser, dto)
        .then((res) => res.data),
    {
      onSuccess: (newUser) => {
        setAuthUser(newUser)
        myNotifications.success('User created!')

        router.push(urls.pages.userProfile(newUser.id))
      },
    }
  )
}

export default useKeepTempUserMutation
