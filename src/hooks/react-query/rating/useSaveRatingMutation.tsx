import { Anchor } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray, upsert } from 'endoh-utils/dist/array'
import Span from '../../../components/_common/text/Span'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { queryKeys } from '../../../utils/queryKeys'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { useMyRouterQuery } from '../../useMyRouterQuery'
import useRatingDetailsModalStore from '../../zustand/modals/useRatingDetailsModalStore'

const useSaveRatingMutation = () => {
  const queryClient = useQueryClient()
  // const { setSuccessMessage, setErrorMessage } = useSnackbarStore()
  const { userId } = useMyRouterQuery()
  const { openModal } = useRatingDetailsModalStore()

  const axios = useAxios()
  return useMutation(
    (payload: RatingDto) =>
      axios
        .post<RatingDto | null>(urls.api.myRatings, payload)
        .then((res) => res.data),
    {
      onSuccess: (savedRating, payload) => {
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

        queryClient.setQueryData<RatingDto[]>([urls.api.myRatings], (curr) => {
          return upsert(curr, savedRating, (i) => i.id === savedRating.id)
        })

        // update timeline item
        queryClient.setQueryData<{ pages: RatingDto[][] }>(
          queryKeys.timelineItems(userId),
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

        myNotifications.success(
          <Span>
            Rating saved!{' '}
            <Anchor onClick={() => openModal(savedRating)}>See details</Anchor>
          </Span>
        )
      },
    }
  )
}

export default useSaveRatingMutation
