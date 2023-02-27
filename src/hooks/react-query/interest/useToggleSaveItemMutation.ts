import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray, upsert } from 'endoh-utils'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { InterestDto } from './InterestDto'

const useToggleSaveItemMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  return useMutation(
    (itemId: string) =>
      axios
        .post<InterestDto | string>(urls.api.toggleSaveItem(itemId))
        .then((res) => res.data),
    {
      onSuccess: (data, itemId) => {
        queryClient.invalidateQueries([urls.api.findSavedItems])

        if (typeof data === 'string') {
          queryClient.setQueryData<InterestDto[]>(
            [urls.api.myInterests],
            (curr) => deleteFromArray(curr, (i) => i.syncroItemId === itemId)
          )
          myNotifications.success('Removed from saved!')
          return
        }

        queryClient.setQueryData<InterestDto[]>(
          [urls.api.myInterests],
          (curr) => {
            return upsert(curr, data, (i) => i.id === data.id)
          }
        )

        myNotifications.success('Saved!')
      },
    }
  )
}

export default useToggleSaveItemMutation
