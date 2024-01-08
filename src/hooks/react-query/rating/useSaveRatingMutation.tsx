import { Anchor } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray, upsert } from 'endoh-utils/dist/array'
import { useRouter } from 'next/router'
import Span from '../../../components/_common/text/Span'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { queryKeys } from '../../../utils/queryKeys'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { useMyRouterQuery } from '../../useMyRouterQuery'
import { useRatingDetailsModalStore } from '../../zustand/modals/useRatingDetailsModalStore'
import useAuthStore from '../../zustand/useAuthStore'
import { useMyRatingsQuery } from './useMyRatingsQuery'

const useSaveRatingMutation = () => {
  const queryClient = useQueryClient()
  // const { setSuccessMessage, setErrorMessage } = useSnackbarStore()
  const { userId: pageUserId } = useMyRouterQuery()
  const { openModal: openModal } = useRatingDetailsModalStore()
  const { data: ratings } = useMyRatingsQuery()

  const router = useRouter()

  const { getAuthUserId } = useAuthStore()

  const axios = useAxios()

  const { authUser } = useAuthStore()

  return useMutation(
    async (payload: RatingDto) => {
      if (!payload.ratingValue) {
        payload.ratingValue = null
      }

      return axios
        .post<RatingDto | null>(urls.api.myRatings, payload)
        .then((res) => res.data)
    },
    {
      onSuccess: (savedRating, payload) => {
        queryClient.invalidateQueries([urls.api.plannedItemsV2(authUser?.id!)])

        if (!savedRating) {
          if (payload.id) {
            queryClient.setQueryData<RatingDto[]>(
              [urls.api.myRatings],
              (curr) => deleteFromArray(curr, (i) => i.id === payload.id)
            )
          }

          myNotifications.success('Rating removed!')

          return
        }

        const prev = queryClient.getQueryData<RatingDto[]>([urls.api.myRatings])
        queryClient.setQueryData<RatingDto[]>([urls.api.myRatings], (curr) => {
          return upsert(curr, savedRating, (i) => i.id === savedRating.id)
        })

        if (prev?.length === 0) {
          router.push(urls.pages.userProfile(getAuthUserId()))
          myNotifications.success(
            '🎉 Your first rating was saved! Moving to profile...'
          )
        } else {
          myNotifications.success(
            <Span>
              Rating saved!{' '}
              <Anchor onClick={() => openModal(savedRating)}>
                See details
              </Anchor>
            </Span>
          )
        }

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
