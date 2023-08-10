import { useQueryState } from 'next-usequerystate'

import { Box, Flex, Modal, Text, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { format } from 'timeago.js'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useRatingDetailsModalStore } from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { useRatingStatusMap } from '../../../../types/domain/rating/useRatingStatusMap'
import { getItemTitleAndYear } from '../../../../utils/domains/syncro-item/getItemTitleAndYear'
import { urls } from '../../../../utils/urls'
import { useAxios } from '../../../../utils/useAxios'
import FavoriteScenesSection from '../../../HomePage/HomeRatingItem/FavoriteScenesSection/FavoriteScenesSection'
import SyncroItemMainInfosSection from '../../../SyncroItemPage/SyncroItemPaperContent/SyncroItemMainInfosSection/SyncroItemMainInfosSection'
import SyncroItemLink from '../../SyncroItemLink/SyncroItemLink'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import SyncroItemImage from '../../image/SyncroItemImage/SyncroItemImage'
import UserImage from '../../image/SyncroItemImage/UserImage/UserImage'
import CenterLoader from '../../overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../overrides/MyNextLink'
import Span from '../../text/Span'

const RatingDetailsModal = () => {
  const {
    initialValue: rating,
    closeModal,
    openModal: openModal,
  } = useRatingDetailsModalStore()

  const theme = useMantineTheme()

  const { data: syncroItem, isLoading } = useSyncroItemDetailsQuery(
    rating?.syncroItemId
  )

  const { data: userInfo } = useUserInfoQuery(rating?.userId)

  const [ratingDetailsId] = useQueryState('ratingDetailsId')

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
  const { isMobile } = useMyMediaQuery()

  return (
    <Modal
      opened={!!ratingDetailsId}
      onClose={closeModal}
      fullScreen={isMobile}
      title={
        syncroItem && <Title order={4}>{getItemTitleAndYear(syncroItem)}</Title>
      }
    >
      {isLoading && <CenterLoader />}
      {!!rating && syncroItem && (
        <FlexCol>
          <Flex gap={16}>
            <SyncroItemLink item={syncroItem}>
              <SyncroItemImage item={syncroItem} width={100} />
            </SyncroItemLink>
            <SyncroItemMainInfosSection
              item={syncroItem}
              isPreview
              hideRatedBySection
            />
          </Flex>

          <Flex mt={16} gap={8}>
            <MyNextLink href={urls.pages.user(rating.userId)}>
              <UserImage
                pictureUrl={userInfo?.profile.pictureUrl}
                username={userInfo?.username}
                widthHeight={40}
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
              <Text></Text>
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

          {!!rating.review && (
            <Text
              sx={{
                marginBottom: 16,
                marginTop: 16,
                whiteSpace: 'pre-line',
                fontStyle: 'italic',
              }}
            >
              {rating.review}
            </Text>
          )}

          {rating.scenes && (
            <Box mt={24}>
              <FavoriteScenesSection scenes={rating.scenes} widthHeight={96} />
            </Box>
          )}

          {/* <HomeRatingItemButtons syncroItemId={rating.syncroItemId!} /> */}
        </FlexCol>
      )}
    </Modal>
  )
}

export default RatingDetailsModal
