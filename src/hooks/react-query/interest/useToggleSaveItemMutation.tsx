import { Text } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { deleteFromArray } from 'endoh-utils/dist/array'
import MyNextLink from '../../../components/_common/overrides/MyNextLink'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'

const useToggleSaveItemMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  const { authUser } = useAuthStore()

  return useMutation(
    (payload: { itemId: string }) =>
      axios
        .post<InterestDto | string>(urls.api.toggleSaveItem(payload.itemId))
        .then((res) => res.data),
    {
      onSuccess: (data, payload) => {
        if (authUser) {
          queryClient.invalidateQueries([urls.api.plannedItems(authUser.id)])
        }

        if (typeof data === 'string') {
          queryClient.setQueryData<InterestDto[]>(
            [urls.api.myInterests],
            (curr) =>
              deleteFromArray(curr, (i) => i.syncroItemId === payload.itemId)
          )

          myNotifications.success('Removed from planned!')
          return
        }

        queryClient.setQueryData<InterestDto[]>(
          [urls.api.myInterests],
          (curr) => {
            return upsert(curr, data, (i) => i.id === data.id)
          }
        )

        if (data.syncroItem?.type)
          myNotifications.success(
            <Text component="span">
              Added to planned!{' '}
              <MyNextLink href={urls.pages.savedItems(data.syncroItem?.type)}>
                <Text component="span" color="primary" underline>
                  See list!
                </Text>
              </MyNextLink>
            </Text>
          )
      },
    }
  )
}

export default useToggleSaveItemMutation
