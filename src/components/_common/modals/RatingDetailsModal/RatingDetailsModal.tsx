import { useQueryState } from 'next-usequerystate'

import { Box, Flex, Modal, Text, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { format } from 'timeago.js'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useRatingDetailsModalStore } from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import {
  RatingDto,
  buildRatingDto,
} from '../../../../types/domain/rating/RatingDto'
import { useRatingStatusMap } from '../../../../types/domain/rating/useRatingStatusMap'
import { getItemTitleAndYear } from '../../../../utils/domains/syncro-item/getItemTitleAndYear'
import { QueryParams } from '../../../../utils/queryParams'
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
    initialValue,
    closeModal,
    openModal: openModal,
    isOpen: modalIsOpen,
  } = useRatingDetailsModalStore()

  const theme = useMantineTheme()

  const { data: syncroItem, isLoading } = useSyncroItemDetailsQuery(
    initialValue?.syncroItemId
  )

  const { data: userInfo } = useUserInfoQuery(initialValue?.userId)

  const [ratingDetailsId] = useQueryState('ratingDetailsId')

  const router = useRouter()
  const axios = useAxios()
  useEffect(() => {
    if (router.isReady && !!ratingDetailsId && !initialValue) {
      axios
        .get<RatingDto>(urls.api.ratingId(ratingDetailsId))
        .then(({ data }) => {
          openModal(data)
        })
    }
  }, [router.isReady])

  const [queryParam] = useQueryState(QueryParams.ratingDetailsId)

  useEffect(() => {
    if (!queryParam && modalIsOpen) {
      closeModal()
      return
    }
    if (queryParam && !modalIsOpen) {
      const newRating = buildRatingDto({
        syncroItemId: syncroItem?.id,
      })
      openModal(initialValue || newRating)
    }
  }, [queryParam])

  const statusMap = useRatingStatusMap(initialValue?.status)
  const { isMobile } = useMyMediaQuery()

  return (
    <Modal
      opened={!!modalIsOpen}
      onClose={closeModal}
      fullScreen={isMobile}
      title={
        syncroItem && <Title order={4}>{getItemTitleAndYear(syncroItem)}</Title>
      }
    >
      {isLoading && <CenterLoader />}
      {!!initialValue && syncroItem && (
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
            <MyNextLink href={urls.pages.userProfile(initialValue.userId)}>
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
                  href={urls.pages.userProfile(initialValue.userId)}
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
                  {initialValue.ratingValue}
                </b>
              </Text>
              <Text></Text>
              <FlexVCenter gap={4}>
                <Text size={'xs'}>
                  {format(initialValue.timelineDate)}
                  {initialValue.consumedOn && ` on ${initialValue.consumedOn}`}
                  {' · '}
                  <Span sx={{ color: statusMap?.color }}>
                    {statusMap?.label}
                  </Span>
                </Text>
              </FlexVCenter>
            </FlexCol>
          </Flex>

          {!!initialValue.review && (
            <Text
              sx={{
                marginBottom: 16,
                marginTop: 16,
                whiteSpace: 'pre-line',
                fontStyle: 'italic',
              }}
            >
              {initialValue.review}
            </Text>
          )}

          {initialValue.scenes && (
            <Box mt={24}>
              <FavoriteScenesSection
                scenes={initialValue.scenes}
                widthHeight={96}
              />
            </Box>
          )}

          {/* <HomeRatingItemButtons syncroItemId={rating.syncroItemId!} /> */}
        </FlexCol>
      )}
    </Modal>
  )
}

export default RatingDetailsModal
