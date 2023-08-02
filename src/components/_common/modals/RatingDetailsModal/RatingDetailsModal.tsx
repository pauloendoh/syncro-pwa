import {
  Box,
  Flex,
  Modal,
  ScrollArea,
  Skeleton,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { format } from 'timeago.js'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { useRatingStatusMap } from '../../../../types/domain/rating/useRatingStatusMap'
import { getItemTitleAndYear } from '../../../../utils/domains/syncro-item/getItemTitleAndYear'
import { urls } from '../../../../utils/urls'
import { useAxios } from '../../../../utils/useAxios'
import FavoriteScenesSection from '../../../HomePage/HomeRatingItem/FavoriteScenesSection/FavoriteScenesSection'
import HomeRatingItemButtons from '../../../HomePage/HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'
import SyncroItemLink from '../../SyncroItemLink/SyncroItemLink'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import SyncroItemImage from '../../image/SyncroItemImage/SyncroItemImage'
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
      <ScrollArea.Autosize mah={'calc(100vh - 120px)'}>
        {!!rating && (
          <FlexCol>
            <Flex justify={'space-between'}>
              <Flex gap={8}>
                <FlexCol justify={'space-between'}>
                  <FlexCol>
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
                              <>{getItemTitleAndYear(syncroItem)}</>
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

                  {rating.review && (
                    <UserImage
                      pictureUrl={userInfo?.profile.pictureUrl}
                      username={userInfo?.username}
                      widthHeight={32}
                    />
                  )}
                </FlexCol>
              </Flex>

              <SyncroItemImage item={syncroItem} />
            </Flex>

            {rating.review && (
              <Box
                // speech bubble
                sx={{
                  backgroundColor: theme.colors.gray[8],
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 8,

                  width: 'fit-content',
                  position: 'relative',

                  '::after': {
                    content: '""',
                    position: 'absolute',
                    top: -12,
                    left: 11,
                    border: '8px solid transparent',
                    borderBottomColor: theme.colors.gray[8],
                  },
                }}
              >
                <Span
                  sx={{
                    whiteSpace: 'pre-line',
                    fontStyle: 'italic',
                  }}
                  size="sm"
                >
                  {rating.review}
                </Span>
              </Box>
            )}

            {rating.scenes && !!rating.scenes.length && (
              <Box mt={24}>
                <FavoriteScenesSection
                  scenes={rating.scenes}
                  widthHeight={120}
                />
              </Box>
            )}

            <Box mt={24}>
              <HomeRatingItemButtons syncroItemId={rating.syncroItemId!} />
            </Box>
          </FlexCol>
        )}
      </ScrollArea.Autosize>
    </Modal>
  )
}

export default RatingDetailsModal
