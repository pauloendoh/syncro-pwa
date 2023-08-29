import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { deleteFromArray } from 'endoh-utils/dist/array'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

const useSaveInterestMutation = () => {
  const queryClient = useQueryClient()
  // const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const axios = useAxios()
  return useMutation(
    (payload: InterestDto) =>
      axios
        .post<InterestDto | null>(urls.api.myInterests, payload)
        .then((res) => res.data),
    {
      onSuccess: (savedInterest, payload) => {
        if (!savedInterest) {
          if (payload.id) {
            queryClient.setQueryData<InterestDto[]>(
              [urls.api.myInterests],
              (curr) => deleteFromArray(curr, (i) => i.id === payload.id)
            )
          }

          myNotifications.success('Interest removed!')

          return
        }

        queryClient.setQueryData<InterestDto[]>(
          [urls.api.myInterests],
          (curr) => {
            return upsert(curr, savedInterest, (i) => i.id === savedInterest.id)
          }
        )

        myNotifications.success('Interest saved!')
      },
    }
  )
}

export default useSaveInterestMutation
