import { useMutation, useQueryClient } from '@tanstack/react-query'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { UserSettingsDto } from './types/UserSettingsDto'

const useUpdateSettingsMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (payload: UserSettingsDto) =>
      axios
        .put<UserSettingsDto>(urls.api.settings, payload)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        // myNotifications.success('Settings saved!')
        qc.setQueryData<UserSettingsDto>([urls.api.settings], saved)
      },
    }
  )
}

export default useUpdateSettingsMutation
