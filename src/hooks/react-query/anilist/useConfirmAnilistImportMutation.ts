import { useMutation } from '@tanstack/react-query'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

const useConfirmAnilistImportMutation = () => {
  const axios = useAxios()
  return useMutation(
    (payload: { url: string; scoringSystem: string }) =>
      axios
        .post(urls.api.importAnilistConfirm, payload)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        myNotifications.success('Anilist import started!')
      },
    }
  )
}

export default useConfirmAnilistImportMutation
