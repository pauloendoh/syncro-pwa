import { Flex, useMantineTheme } from '@mantine/core'
import { format } from 'timeago.js'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import { useRatingStatusIcon } from '../../../../../types/domain/rating/useRatingStatusIcon/useRatingStatusIcon'
import { urls } from '../../../../../utils/urls'
import FlexCol from '../../../flex/FlexCol'
import UserImage from '../../../image/SyncroItemImage/UserImage/UserImage'
import MyNextLink from '../../../overrides/MyNextLink'
import MyText from '../../../text/MyText'

type Props = {
  rating: RatingDto
}

const ItemRatedByModalItem = ({ rating, ...props }: Props) => {
  const theme = useMantineTheme()
  const Icon = useRatingStatusIcon(rating.status)

  return (
    <Flex key={rating.id} gap={16}>
      <MyNextLink href={urls.pages.user(rating.userId)}>
        <UserImage
          widthHeight={40}
          pictureUrl={rating.user?.profile?.pictureUrl}
          username={rating.user?.username}
        />
      </MyNextLink>

      <Flex justify={'space-between'} sx={{ flexGrow: 1 }}>
        <FlexCol>
          <MyText>
            <MyNextLink
              href={urls.pages.user(rating.userId)}
              style={{
                fontWeight: 500,
              }}
            >
              {rating.user?.username}
            </MyNextLink>
            <Icon
              color={theme.colors.yellow[5]}
              style={{
                position: 'relative',
                top: 3,
                marginLeft: 4,
              }}
            />
            <b
              style={{
                color: theme.colors.yellow[5],
              }}
            >
              {rating.ratingValue}
            </b>
          </MyText>
          <MyText size="sm">{rating.user?.profile?.fullName}</MyText>
        </FlexCol>

        <MyText size="sm">{format(rating.createdAt)}</MyText>
      </Flex>
    </Flex>
  )
}

export default ItemRatedByModalItem
