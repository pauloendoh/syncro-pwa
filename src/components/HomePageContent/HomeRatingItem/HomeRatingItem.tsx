import { Flex, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import NextLink from 'next/link'
import { format } from 'timeago.js'
import { RatingDto } from '../../../types/domains/rating/RatingDto'
import { getSyncroItemImageOrDefault } from '../../../utils/image/getSyncroItemImageOrDefault'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import MyPaper from '../../_common/overrides/MyPaper'

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
            <b>{props.rating.user?.username}</b> rated{' '}
            <b
              style={{
                color: theme.colors.yellow[5],
              }}
            >
              {props.rating.ratingValue}
            </b>
          </Text>
          <Text>
            <b>
              {props.rating.syncroItem?.title}{' '}
              {props.rating.syncroItem?.year &&
                `(${props.rating.syncroItem?.year})`}
            </b>
          </Text>
          <Text size={'xs'}>{format(props.rating.createdAt)}</Text>
        </FlexCol>
        <NextLink
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
        </NextLink>
      </Flex>
    </MyPaper>
  )
}

export default HomeRatingItem
