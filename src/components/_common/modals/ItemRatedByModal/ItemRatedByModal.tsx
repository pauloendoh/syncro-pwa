import { Flex, Modal, Text, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { format } from 'timeago.js'
import { useItemRatedByQuery } from '../../../../hooks/react-query/rating/useItemRatedByQuery'
import useItemRatedByModalStore from '../../../../hooks/zustand/modals/useItemRatedByModalStore'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../flex/FlexCol'
import UserImage from '../../image/SyncroItemImage/UserImage/UserImage'
import MyNextLink from '../../overrides/MyNextLink'

const ItemRatedByModal = () => {
  const { isOpen, itemId, closeModal } = useItemRatedByModalStore()

  const { data } = useItemRatedByQuery(itemId!)

  // newest first
  const sortedRatings = useMemo(
    () => data?.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) || [],
    [data]
  )

  const theme = useMantineTheme()

  const router = useRouter()
  useEffect(() => {
    closeModal()
  }, [router.pathname])

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={<Title order={4}>Rated by users you follow</Title>}
      withCloseButton={false}
      styles={{
        root: {
          top: 80,
        },
      }}
    >
      <FlexCol gap={16}>
        {sortedRatings.map((rating) => (
          <Flex key={rating.id} gap={16}>
            <MyNextLink href={urls.pages.user(rating.userId)}>
              <UserImage
                widthHeight={40}
                pictureUrl={rating.user?.profile?.pictureUrl}
                username={rating.user?.username}
              />
            </MyNextLink>

            <Flex justify={'space-between'} sx={{ flexGrow: 1 }}>
              <FlexCol>
                <Text>
                  <MyNextLink
                    href={urls.pages.user(rating.userId)}
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    {rating.user?.username}
                  </MyNextLink>
                  ·{' '}
                  <b
                    style={{
                      color: theme.colors.yellow[5],
                    }}
                  >
                    {rating.ratingValue}
                  </b>
                </Text>
                <Text size="sm">{rating.user?.profile?.fullName}</Text>
              </FlexCol>

              <Text size="sm">{format(rating.createdAt)}</Text>
            </Flex>
          </Flex>
        ))}
      </FlexCol>
    </Modal>
  )
}

export default ItemRatedByModal
