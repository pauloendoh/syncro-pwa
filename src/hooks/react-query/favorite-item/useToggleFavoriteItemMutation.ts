import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray, pushOrReplace } from 'endoh-utils'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'
import { FavoriteItemDto } from './types/FavoriteItemDto'

const useToggleFavoriteItemMutation = () => {
  const axios = useAxios()
  const queryClient = useQueryClient()
  const { authUser } = useAuthStore()
  return useMutation(
    (itemId: string) => {
      return axios
        .post<FavoriteItemDto | 'deleted'>(urls.api.toggleFavoriteItem(itemId))
        .then((res) => res.data)
    },
    {
      onSuccess: (result, itemId) => {
        const queryKey = [urls.api.favoriteItems(String(authUser?.id))]
        if (result === 'deleted') {
          queryClient.setQueryData<FavoriteItemDto[]>(queryKey, (curr) =>
            deleteFromArray(curr, (f) => f.syncroItemId === itemId)
          )

          myNotifications.success('Item removed from favorites!')
          return
        }

        queryClient.setQueryData<FavoriteItemDto[]>(queryKey, (curr) =>
          pushOrReplace(curr, result, 'id')
        )

        myNotifications.success('Item added to favorites!')
      },
    }
  )
}

export default useToggleFavoriteItemMutation
