import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils/dist/array'
import { useRouter } from 'next/router'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { queryKeys } from '../../../../utils/queryKeys'
import { urls } from '../../../../utils/urls/urls'
import { useAxios } from '../../../../utils/useAxios'
import { useMyRouterQuery } from '../../../useMyRouterQuery'
import { useRatingDetailsModalStore } from '../../../zustand/modals/useRatingDetailsModalStore'
import useAuthStore from '../../../zustand/useAuthStore'
import { moveToProfileOrStay } from './moveToProfileOrStay/moveToProfileOrStay'

// PE 2/3
const useSaveRatingMutation = () => {
  const axios = useAxios()
  const queryClient = useQueryClient()

  const router = useRouter()
  const { userId: pageUserId } = useMyRouterQuery()

  const { openModal: openEntryDetailsModal } = useRatingDetailsModalStore()
  const { getAuthUserId } = useAuthStore()
  const { authUser } = useAuthStore()

  return useMutation(
    async (payload: RatingDto) => {
      if (!payload.ratingValue) {
        payload.ratingValue = null
      }

      return axios
        .post<RatingDto>(urls.api.myRatings, payload)
        .then((res) => res.data)
    },
    {
      onSuccess: (savedRating, payload) => {
        queryClient.invalidateQueries([urls.api.plannedItemsV2(authUser?.id!)])

        // this has to be done before updating myRatings
        const prevMyRatings = queryClient.getQueryData<RatingDto[]>([
          urls.api.myRatings,
        ])

        queryClient.setQueryData<RatingDto[]>([urls.api.myRatings], (curr) => {
          return upsert(curr, savedRating, (i) => i.id === savedRating.id)
        })

        moveToProfileOrStay({
          prevMyRatings: prevMyRatings || [],
          router,
          authUserId: getAuthUserId(),
          openEntryDetailsModal,
          savedRating,
        })

        // update timeline item
        queryClient.setQueryData<{ pages: RatingDto[][] }>(
          queryKeys.timelineItems(pageUserId),
          (curr) => {
            if (!curr) return curr

            const pages = curr.pages.map((page) => {
              return page.map((rating) => {
                if (rating.id === savedRating.id) {
                  // update only some fields, for the returned object does not include everything
                  rating.ratingValue = savedRating.ratingValue
                  rating.review = savedRating.review
                  return rating
                }
                return rating
              })
            })
            return {
              ...curr,
              pages,
            }
          }
        )
      },
    }
  )
}

export default useSaveRatingMutation
