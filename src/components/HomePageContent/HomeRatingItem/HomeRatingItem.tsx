import { Flex, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { format } from 'timeago.js'
import { RatingDto } from '../../../types/domains/rating/RatingDto'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import {
  default as Link,
  default as MyNextLink,
} from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'

type Props = {
  rating: RatingDto
}

const HomeRatingItem = (props: Props) => {
  const theme = useMantineTheme()

  const isSmallScreen = useMediaQuery('(max-width: 600px)')

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
                  `(${props.rating.syncroItem?.year})`}
              </Text>
            </MyNextLink>
          </Text>
          <Text size={'xs'}>{format(props.rating.createdAt)}</Text>
        </FlexCol>
        <Link
          href={urls.pages.syncroItem(encodeURI(props.rating.syncroItemId!))}
        >
          <SyncroItemImage
            item={props.rating.syncroItem}
            width={isSmallScreen ? 120 : 160}
            height={isSmallScreen ? 120 : 160}
          />
        </Link>
      </Flex>
    </MyPaper>
  )
}

export default HomeRatingItem
