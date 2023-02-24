import { Flex, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'

import { format } from 'timeago.js'
import { RatingDto } from '../../../types/domains/rating/RatingDto'
import { getSyncroItemImageOrDefault } from '../../../utils/image/getSyncroItemImageOrDefault'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import MyPaper from '../../_common/overrides/MyPaper'
import {
  default as Link,
  default as NextLink,
} from '../../_common/overrides/NextLink'
import SyncroItemIcon from './SyncroItemIcon/SyncroItemIcon'

type Props = {
  rating: RatingDto
}

const HomeRatingItem = (props: Props) => {
  const theme = useMantineTheme()

  const isSmallScreen = useMediaQuery('(max-width: 600px)')

  return (
    <MyPaper key={props.rating.id} sx={{ position: 'relative' }}>
      <Image
        alt={props.rating.user?.username || 'username'}
        src={
          props.rating.user?.profile?.pictureUrl || '/images/avatars/avatar.png'
        }
        width={40}
        height={40}
        style={{
          position: 'absolute',
          borderRadius: 40,
          left: isSmallScreen ? -16 : -24,
          top: 24,
        }}
      />
      <Flex ml={16} justify="space-between">
        <FlexCol>
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
          <Text>
            <NextLink
              href={urls.pages.syncroItem(
                encodeURI(props.rating.syncroItemId!)
              )}
            >
              <Text span weight={600}>
                {props.rating.syncroItem?.title}{' '}
                {props.rating.syncroItem?.year &&
                  `(${props.rating.syncroItem?.year})`}
              </Text>
            </NextLink>

            <span
              style={{ marginLeft: 8, top: 3, position: 'relative' }}
              title={props.rating.syncroItem?.type}
            >
              <SyncroItemIcon
                type={props.rating.syncroItem?.type || 'tvSeries'}
              />
            </span>
          </Text>
          <Text size={'xs'}>{format(props.rating.createdAt)}</Text>
        </FlexCol>
        <Link
          href={urls.pages.syncroItem(encodeURI(props.rating.syncroItemId!))}
        >
          <Image
            width={100}
            height={100}
            src={getSyncroItemImageOrDefault(props.rating.syncroItem?.imageUrl)}
            alt={props.rating.syncroItem?.title || 'syncro-item'}
            style={{
              objectFit: 'cover',
            }}
          />
        </Link>
      </Flex>
    </MyPaper>
  )
}

export default HomeRatingItem
