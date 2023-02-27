import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { deleteFromArray } from 'endoh-utils/dist/array'
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
        // showSuccessToast(
        //   <Text>
        //     Item saved!{" "}
        //     <Text
        //       onPress={() => {
        //         navigate("SavedItems")
        //       }}
        //       fontWeight="semibold"
        //       style={{
        //         textDecorationLine: "underline",
        //       }}
        //     >
        //       See list
        //     </Text>
        //   </Text>,
        //   {
        //     duration: 7500,
        //   }
        // )
      },
    }
  )
}

export default useToggleSaveItemMutation
