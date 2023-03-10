import { ActionIcon, Flex, Modal, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { MdClose } from 'react-icons/md'
import { format } from 'timeago.js'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { urls } from '../../../../utils/urls'
import HomeRatingItemButtons from '../../../HomePageContent/HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'
import FlexCol from '../../flex/FlexCol'
import UserImage from '../../image/SyncroItemImage/UserImage/UserImage'
import MyNextLink from '../../overrides/MyNextLink'

const RatingDetailsModal = () => {
  const {
    isOpen,
    initialValue: rating,
    closeModal,
  } = useRatingDetailsModalStore()

  const theme = useMantineTheme()

  const { data: syncroItem } = useSyncroItemDetailsQuery(rating?.syncroItemId)

  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const { data: userInfo } = useUserInfoQuery(rating?.userId)

  return (
    <Modal opened={isOpen} onClose={closeModal} withCloseButton={false}>
      {!!rating && (
        <FlexCol>
          <Flex justify={'space-between'}>
            <Flex gap={8}>
              <MyNextLink href={urls.pages.user(rating.userId)}>
                <UserImage
                  pictureUrl={userInfo?.profile.pictureUrl}
                  username={userInfo?.username}
                  widthHeight={64}
                />
              </MyNextLink>
              <FlexCol
                sx={{
                  justifyContent: 'space-between',
                }}
              >
                <Text>
                  <MyNextLink
                    href={urls.pages.user(rating.userId)}
                    style={{
                      color: 'unset',
                    }}
                  >
                    <Text weight={600} span>
                      {userInfo?.username}
                    </Text>{' '}
                  </MyNextLink>
                  {!!rating.review && 'reviewed and '}
                  rated{' '}
                  <b
                    style={{
                      color: theme.colors.yellow[5],
                    }}
                  >
                    {rating.ratingValue}
                  </b>
                </Text>
                <Text>
                  <MyNextLink
                    href={urls.pages.syncroItem(
                      encodeURI(rating.syncroItemId!)
                    )}
                  >
                    <Text
                      span
                      weight={600}
                      sx={(theme) => ({
                        color: theme.colors.gray[0],
                      })}
                    >
                      {syncroItem?.title}{' '}
                      {syncroItem?.year && `[${syncroItem.year}]`}
                    </Text>
                  </MyNextLink>
                </Text>
                <Text size={'xs'}>{format(rating.createdAt)}</Text>
              </FlexCol>
            </Flex>
            <ActionIcon onClick={closeModal}>
              <MdClose />
            </ActionIcon>
          </Flex>

          <Text
            sx={{
              marginBottom: 16,
              marginTop: 24,
              whiteSpace: 'pre-line',
            }}
          >
            {rating.review}
          </Text>

          <HomeRatingItemButtons syncroItemId={rating.syncroItemId!} />
        </FlexCol>
      )}
    </Modal>
  )
}

export default RatingDetailsModal
