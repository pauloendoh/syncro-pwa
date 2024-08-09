import { useMutation, useQueryClient } from '@tanstack/react-query'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

const useAddUserDailyLogMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(() => axios.post(urls.api.dashboard.userDailyLog), {
    onSuccess: (saved) => {},
  })
}

export default useAddUserDailyLogMutation
