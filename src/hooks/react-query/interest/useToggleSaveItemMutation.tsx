import { Text } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { deleteFromArray } from 'endoh-utils/dist/array'
import MyNextLink from '../../../components/_common/overrides/MyNextLink'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

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
