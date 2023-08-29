import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileDto } from '../../../types/domain/profile/ProfileDto'
import { ProfilePutDto } from '../../../types/domain/profile/ProfilePutDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  const [authUser, setAuthUser] = useAuthStore((s) => [
    s.authUser,
    s.setAuthUser,
  ])

  return useMutation(
    (dto: ProfilePutDto) =>
      axios.put<ProfileDto>(urls.api.myProfile, dto).then((res) => res.data),
    {
      onSuccess: async (updatedProfile, payload) => {
        setAuthUser({ ...authUser!, username: payload.username })

        myNotifications.success('Profile saved!')
      },
    }
  )
}

export default useUpdateProfileMutation
