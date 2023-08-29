import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray, upsert } from 'endoh-utils'
import { FollowDto } from '../../../types/domain/follow/FollowDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

const useToggleFollowMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  return useMutation(
    (followingUserId: string) =>
      axios
        .post<FollowDto | 'deleted'>(urls.api.toggleFollow(followingUserId))
        .then((res) => res.data),
    {
      onSuccess: (data, followingUserId) => {
        if (data === 'deleted') {
          if (followingUserId) {
            queryClient.setQueryData<FollowDto[]>(
              [urls.api.myFollowingUsers],
              (curr) =>
                deleteFromArray(
                  curr,
                  (i) => i.followingUserId === followingUserId
                )
            )
          }

          myNotifications.success('Unfollowed!')

          return
        }

        queryClient.setQueryData<FollowDto[]>(
          [urls.api.myFollowingUsers],
          (curr) => {
            return upsert(curr, data, (i) => i.id === data.id)
          }
        )

        myNotifications.success('Following!')
      },
    }
  )
}

export default useToggleFollowMutation
