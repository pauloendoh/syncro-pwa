import { Box, Center, Flex, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useQueryClient } from '@tanstack/react-query'

import { format } from 'timeago.js'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import { default as MyNextLink } from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'
import HomeRatingItemButtons from './HomeRatingItemButtons/HomeRatingItemButtons'
import HomeRatingItemReview from './HomeRatingItemReview/HomeRatingItemReview'
import SyncroItemIcon from './SyncroItemIcon/SyncroItemIcon'

type Props = {
  rating: RatingDto
}

//
const HomeRatingItem = (props: Props) => {
  const theme = useMantineTheme()

  const isSmallScreen = useMediaQuery('(max-width: 860px)')

  const queryClient = useQueryClient()
  const handleClick = () => {
    if (props.rating.syncroItem) {
      queryClient.setQueryData<SyncroItemDto>(
        [urls.api.syncroItemDetails(props.rating.syncroItem.id)],
        props.rating.syncroItem
      )
    }
  }

  const typeMap = useSyncroItemTypeMap({
    itemType: props.rating.syncroItem?.type,
  })

  return (
    <MyPaper key={props.rating.id} sx={{ position: 'relative' }}>
      <MyNextLink href={urls.pages.user(props.rating.userId)}>
        <div
          style={{
            position: 'absolute',
            left: isSmallScreen ? -12 : -24,
            top: 24,
          }}
        >
          <UserImage
            pictureUrl={props.rating.user?.profile?.pictureUrl}
            username={props.rating.user?.username}
          />
        </div>
      </MyNextLink>
      <Flex ml={isSmallScreen ? 20 : 16} justify="space-between" gap={16}>
        <FlexCol
          sx={{
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <FlexCol sx={{ flexGrow: 1 }}>
            <Text>
              <MyNextLink
                href={urls.pages.user(props.rating.userId)}
                style={{
                  color: 'unset',
                }}
              >
                <Text weight={600} span>
                  {props.rating.user?.username}
                </Text>{' '}
              </MyNextLink>
              rated{' '}
              <b
                style={{
                  color: theme.colors.yellow[5],
                }}
              >
                {props.rating.ratingValue}
              </b>
            </Text>
            <Text>
              <MyNextLink
                onClick={handleClick}
                href={urls.pages.syncroItem(
                  encodeURI(props.rating.syncroItemId!)
                )}
              >
                <Text
                  span
                  weight={600}
                  sx={(theme) => ({
                    color: theme.colors.gray[0],
                  })}
                >
                  {props.rating.syncroItem?.title}{' '}
                  {props.rating.syncroItem?.year &&
                    `[${props.rating.syncroItem?.year}]`}
                </Text>
              </MyNextLink>
            </Text>
            <Text size={'xs'}>{format(props.rating.createdAt)}</Text>

            <HomeRatingItemReview rating={props.rating} />
          </FlexCol>

          <HomeRatingItemButtons
            syncroItemId={props.rating.syncroItemId!}
            itemType={props.rating.syncroItem?.type}
          />
        </FlexCol>
        <MyNextLink
          onClick={handleClick}
          href={urls.pages.syncroItem(encodeURI(props.rating.syncroItemId!))}
        >
          <Box pos="relative">
            <SyncroItemImage
              item={props.rating.syncroItem}
              width={isSmallScreen ? 100 : 120}
            />

            <Center
              pos="absolute"
              right={2}
              bottom={2}
              title={typeMap?.getTypeLabel() || 'Unknown type'}
              sx={{
                backgroundColor: theme.colors.gray[9],
                width: 32,
                height: 32,
                borderRadius: '50%',
              }}
            >
              <SyncroItemIcon type={props.rating.syncroItem!.type} size={16} />
            </Center>
          </Box>
        </MyNextLink>
      </Flex>
    </MyPaper>
  )
}

export default HomeRatingItem
