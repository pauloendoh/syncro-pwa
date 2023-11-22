import { Flex, useMantineTheme } from '@mantine/core'
import { format } from 'timeago.js'
import { useRatingDetailsModalStore } from '../../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import { useRatingStatusIcon } from '../../../../../types/domain/rating/useRatingStatusIcon/useRatingStatusIcon'
import { urls } from '../../../../../utils/urls/urls'
import FlexCol from '../../../flex/FlexCol'
import FlexVCenter from '../../../flex/FlexVCenter'
import UserImage from '../../../image/SyncroItemImage/UserImage/UserImage'
import MyNextLink from '../../../overrides/MyNextLink'
import MyText from '../../../text/MyText'
import UserEntryIcons from './UserEntryIcons/UserEntryIcons'

type Props = {
  rating: RatingDto
}

const ItemRatedByModalItem = ({ rating, ...props }: Props) => {
  const theme = useMantineTheme()
  const Icon = useRatingStatusIcon(rating.status)
  const { openModal } = useRatingDetailsModalStore()

  return (
    <Flex key={rating.id} gap={16}>
      <MyNextLink href={urls.pages.userProfile(rating.userId)}>
        <UserImage
          widthHeight={40}
          pictureUrl={rating.user?.profile?.pictureUrl}
          username={rating.user?.username}
        />
      </MyNextLink>

      <Flex justify={'space-between'} sx={{ flexGrow: 1 }}>
        <FlexCol>
          <FlexVCenter
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <MyNextLink
              href={urls.pages.userProfile(rating.userId)}
              style={{
                fontWeight: 500,
                marginRight: 8,
              }}
            >
              {rating.user?.username}
            </MyNextLink>
            <UserEntryIcons color={theme.colors.yellow[5]} rating={rating} />
          </FlexVCenter>
          <MyText size="sm">{rating.user?.profile?.fullName}</MyText>
        </FlexCol>

        <MyText size="sm">{format(rating.createdAt)}</MyText>
      </Flex>
    </Flex>
  )
}

export default ItemRatedByModalItem
