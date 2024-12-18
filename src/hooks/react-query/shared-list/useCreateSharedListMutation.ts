import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { SharedListDto } from './types/SharedListDto'

export const useCreateSharedListMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (payload: { userIds: string[]; title: string }) =>
      axios
        .post<SharedListDto>(urls.api.sharedList.createSharedList(), payload)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        qc.setQueryData<SharedListDto[]>(
          [urls.api.sharedList.mySharedLists()],
          (curr) => upsert(curr, saved, (i) => i.id === saved.id)
        )

        myNotifications.success('Shared list created!')
      },
    }
  )
}
