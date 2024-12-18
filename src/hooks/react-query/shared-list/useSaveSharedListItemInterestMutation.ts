import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { produce } from 'immer'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { useAuthUser } from '../../domains/auth/useAuthUser'
import { ParsedSharedListItemDto } from './types/ParsedSharedListItemDto'
import { SharedListInterestItemDto } from './types/SharedListInterestItemDto'

export const useSaveSharedListItemInterestMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  const authUser = useAuthUser()

  return useMutation(
    (payload: {
      sharedListId: string
      syncroItemId: string
      interest: number
    }) =>
      axios
        .post<SharedListInterestItemDto>(
          urls.api.sharedList.sharedListItemMutation(),
          payload
        )
        .then((res) => res.data),
    {
      onSuccess: (saved, input) => {
        qc.setQueryData<ParsedSharedListItemDto[]>(
          [urls.api.sharedList.sharedListItems(input.sharedListId)],
          (curr) => {
            return produce(curr, (copy) => {
              const itemIndex = copy?.findIndex(
                (i) => i.item.id === input.syncroItemId
              )
              if (
                itemIndex !== -1 &&
                itemIndex !== undefined &&
                copy !== undefined
              ) {
                copy[itemIndex].interests = upsert(
                  copy[itemIndex].interests,
                  {
                    interest: saved.interest,
                    userId: authUser?.id!,
                    id: saved.id,
                  },
                  (i) => i.userId === authUser?.id
                )
              }

              return copy
            })
          }
        )

        myNotifications.success('Interest saved!')
      },
    }
  )
}
