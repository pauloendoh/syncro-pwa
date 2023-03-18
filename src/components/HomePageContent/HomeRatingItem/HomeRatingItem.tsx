import { Box, Center, Flex, Text, useMantineTheme } from '@mantine/core'
import { useElementSize, useMediaQuery } from '@mantine/hooks'
import { useQueryClient } from '@tanstack/react-query'

import { format } from 'timeago.js'
import useRatingDetailsModalStore from '../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import { default as MyNextLink } from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'
import HomeRatingItemButtons from './HomeRatingItemButtons/HomeRatingItemButtons'
import SyncroItemIcon from './SyncroItemIcon/SyncroItemIcon'

type Props = {
  rating: RatingDto
}

const HomeRatingItem = (props: Props) => {
  const theme = useMantineTheme()

  const isSmallScreen = useMediaQuery('(max-width: 860px)')
  const { ref: reviewRef, height: reviewHeight } = useElementSize()
  const { openModal } = useRatingDetailsModalStore()

  const queryClient = useQueryClient()
  const handleClick = () => {
    if (props.rating.syncroItem) {
      queryClient.setQueryData<SyncroItemDto>(
        [urls.api.syncroItemDetails(props.rating.syncroItem.id)],
        props.rating.syncroItem
      )
    }
  }

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
      <Flex ml={isSmallScreen ? 20 : 16} justify="space-between">
        <FlexCol
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <FlexCol>
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
              {!!props.rating.review && 'reviewed and '}
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

            <Text
              sx={{
                marginBottom: 16,
                marginTop: 8,
                fontSize: 14,
                fontStyle: 'italic',
                a: {
                  textDecoration: 'none',
                },
                whiteSpace: 'pre-line',
              }}
            >
              <Text lineClamp={3} ref={reviewRef}>
                {props.rating.review}
              </Text>
              {reviewHeight > 64 && (
                <Text
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                  onClick={() => openModal(props.rating)}
                >
                  See more
                </Text>
              )}
            </Text>
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
              width={isSmallScreen ? 120 : 160}
              height={isSmallScreen ? 120 : 160}
            />

            <Center
              pos="absolute"
              right={2}
              bottom={2}
              title={props.rating.syncroItem?.type}
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
