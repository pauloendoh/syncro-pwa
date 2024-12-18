import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray } from 'endoh-utils'
import { produce } from 'immer'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { ParsedSharedListItemDto } from './types/ParsedSharedListItemDto'
import { SharedListInterestItemDto } from './types/SharedListInterestItemDto'

export const useDeleteSharedListItemInterestMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (input: { interestId: string }) =>
      axios
        .delete<SharedListInterestItemDto>(
          urls.api.sharedList.sharedListItemId(input.interestId)
        )
        .then((res) => res.data),
    {
      onSuccess: (deleted, input) => {
        qc.setQueryData<ParsedSharedListItemDto[]>(
          [urls.api.sharedList.sharedListItems(deleted.sharedListId)],
          (curr) => {
            return produce(curr, (copy) => {
              const itemIndex = copy?.findIndex(
                (i) => i.item.id === deleted.syncroItemId
              )
              if (
                itemIndex !== -1 &&
                itemIndex !== undefined &&
                copy !== undefined
              ) {
                copy[itemIndex].interests = deleteFromArray(
                  copy[itemIndex].interests,
                  (i) => i.id === input.interestId
                )
              }

              return copy
            })
          }
        )

        myNotifications.success('Interest removed!')
      },
    }
  )
}
