import {
  ActionIcon,
  Flex,
  Modal,
  Skeleton,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { format } from 'timeago.js'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { useRatingStatusMap } from '../../../../types/domain/rating/useRatingStatusMap'
import { urls } from '../../../../utils/urls'
import { useAxios } from '../../../../utils/useAxios'
import HomeRatingItemButtons from '../../../HomePageContent/HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'
import SyncroItemLink from '../../SyncroItemLink/SyncroItemLink'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import UserImage from '../../image/SyncroItemImage/UserImage/UserImage'
import MyNextLink from '../../overrides/MyNextLink'
import Span from '../../text/Span'

const RatingDetailsModal = () => {
  const {
    initialValue: rating,
    closeModal,
    openModal,
  } = useRatingDetailsModalStore()

  const theme = useMantineTheme()

  const { data: syncroItem, isLoading } = useSyncroItemDetailsQuery(
    rating?.syncroItemId
  )

  const { data: userInfo } = useUserInfoQuery(rating?.userId)
  const { ratingDetailsId } = useMyRouterQuery()

  const router = useRouter()
  const axios = useAxios()
  useEffect(() => {
    if (router.isReady && !!ratingDetailsId) {
      axios
        .get<RatingDto>(urls.api.ratingId(ratingDetailsId))
        .then(({ data }) => {
          openModal(data)
        })
    }
  }, [router.isReady])

  const statusMap = useRatingStatusMap(rating?.status)

  return (
    <Modal
      opened={!!ratingDetailsId}
      onClose={closeModal}
      withCloseButton={false}
    >
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
                  {isLoading && <Skeleton height={12} radius="xl" />}

                  {syncroItem && (
                    <SyncroItemLink item={syncroItem}>
                      <Text
                        span
                        weight={600}
                        sx={(theme) => ({
                          color: theme.colors.gray[0],
                        })}
                      >
                        {syncroItem && (
                          <>
                            {syncroItem?.title}{' '}
                            {syncroItem?.year && `[${syncroItem.year}]`}
                          </>
                        )}
                      </Text>
                    </SyncroItemLink>
                  )}
                </Text>
                <FlexVCenter gap={4}>
                  <Text size={'xs'}>
                    {format(rating.createdAt)}
                    {' · '}
                    <Span sx={{ color: statusMap?.color }}>
                      {statusMap?.label}
                    </Span>
                  </Text>
                </FlexVCenter>
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
