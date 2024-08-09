import { Anchor } from '@mantine/core'
import { NextRouter } from 'next/router'
import MySpan from '../../../../../components/_common/text/MySpan'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../../../utils/mantine/myNotifications'
import { urls } from '../../../../../utils/urls/urls'

export const moveToProfileOrStay = (params: {
  prevMyRatings: RatingDto[]
  router: NextRouter
  authUserId: string
  openEntryDetailsModal: (rating: RatingDto) => void
  savedRating: RatingDto
}) => {
  const {
    prevMyRatings,
    router,
    authUserId,
    openEntryDetailsModal,
    savedRating,
  } = params

  if (prevMyRatings.length === 0) {
    router.push(urls.pages.userProfile(authUserId))
    myNotifications.success(
      '🎉 Your first rating was saved! Moving to profile...'
    )
  } else {
    myNotifications.success(
      <MySpan>
        Rating saved!{' '}
        <Anchor onClick={() => openEntryDetailsModal(savedRating)}>
          See details
        </Anchor>
      </MySpan>
    )
  }
}
