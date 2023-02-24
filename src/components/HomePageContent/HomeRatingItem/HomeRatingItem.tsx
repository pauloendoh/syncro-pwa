import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { format } from 'timeago.js'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { RatingDto } from '../../../types/domains/rating/RatingDto'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import { default as MyNextLink } from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'
import SyncroItemIcon from './SyncroItemIcon/SyncroItemIcon'

type Props = {
  rating: RatingDto
}

const HomeRatingItem = (props: Props) => {
  const theme = useMantineTheme()

  const isSmallScreen = useMediaQuery('(max-width: 600px)')

  const typeMap = useSyncroItemTypeMap({
    itemType: props.rating.syncroItem?.type || 'tvSeries',
  })

  return (
    <MyPaper key={props.rating.id} sx={{ position: 'relative' }}>
      <MyNextLink href={urls.pages.user(props.rating.userId)}>
        <div
          style={{
            position: 'absolute',
            left: isSmallScreen ? -16 : -24,
            top: 24,
          }}
        >
          <UserImage
            pictureUrl={props.rating.user?.profile?.pictureUrl}
            username={props.rating.user?.username}
          />
        </div>
      </MyNextLink>
      <Flex ml={16} justify="space-between" sx={{ flexGrow: 1 }}>
        <FlexCol sx={{ flexGrow: 1 }} gap={16}>
          <FlexVCenter justify={'space-between'} sx={{ flexGrow: 1 }}>
            <Text>
              <Text weight={600} span>
                {props.rating.user?.username}
              </Text>{' '}
              rated{' '}
              <b
                style={{
                  color: theme.colors.yellow[5],
                }}
              >
                {props.rating.ratingValue}
              </b>
            </Text>

            <Text size={'sm'}>{format(props.rating.createdAt)}</Text>
          </FlexVCenter>

          <Flex gap={16}>
            <MyNextLink
              href={urls.pages.syncroItem(
                encodeURI(props.rating.syncroItemId!)
              )}
            >
              <SyncroItemImage
                item={props.rating.syncroItem}
                height={isSmallScreen ? 100 : 160}
                width={isSmallScreen ? 100 : 160}
              />
            </MyNextLink>

            <FlexCol>
              <Text>
                <MyNextLink
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

              <FlexVCenter gap={4} mt={8}>
                <Box sx={{ position: 'relative', top: 2 }}>
                  <SyncroItemIcon
                    type={props.rating.syncroItem?.type || 'tvSeries'}
                  />
                </Box>
                <Text size="sm">{typeMap.getTypeLabel()}</Text>
              </FlexVCenter>
            </FlexCol>
          </Flex>
        </FlexCol>
      </Flex>
    </MyPaper>
  )
}

export default HomeRatingItem
