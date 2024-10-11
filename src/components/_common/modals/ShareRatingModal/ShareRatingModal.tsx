import {
  Button,
  Center,
  Modal,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useMemo } from 'react'
import { FaTwitter } from 'react-icons/fa'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useSettingsQuery } from '../../../../hooks/react-query/user-settings/useSettingsQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import { useModalZIndex } from '../../../../hooks/utils/useModalZIndex'
import useMinRatingSharingModalStore from '../../../../hooks/zustand/modals/useMinRatingSharingModalStore'
import useShareRatingModalStore from '../../../../hooks/zustand/modals/useShareRatingModalStore'
import { myNotifications } from '../../../../utils/mantine/myNotifications'
import { urls } from '../../../../utils/urls/urls'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'

const ShareRatingModal = () => {
  const {
    initialValue: rating,
    closeModal,
    isAfterRating,
  } = useShareRatingModalStore()

  const theme = useMantineTheme()

  const { shareRatingModal } = useMyRouterQuery()

  const urlToCopy = useMemo(() => {
    if (!rating?.syncroItemId) return ''
    return (
      'https://syncro.vercel.app' +
      urls.pages.syncroItem(rating?.syncroItemId, {
        ratingDetailsId: rating.id,
      })
    )
  }, [rating])

  const { data: item } = useSyncroItemDetailsQuery(rating?.syncroItemId)

  const typeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })

  const textToShare = useMemo(() => {
    const text = `Rated a ${typeMap.getTypeLabelLowerCase()} ${
      rating?.ratingValue
    }/10:\n${item?.title} ${item?.year && `[${item.year}]`}${
      rating?.review ? `\n\n${rating.review}` : ''
    }\n\n`

    const limit = 280 - 30

    if (text.length > limit) {
      return text.slice(0, limit) + '...\n\n'
    }
    return text
  }, [rating, item, typeMap, urlToCopy])

  const zIndex = useModalZIndex({
    isOpen: !!shareRatingModal,
  })

  const { data: userSettings } = useSettingsQuery()

  const { openModal: openMinRatingSharingModal } =
    useMinRatingSharingModalStore()

  return (
    <Modal
      opened={!!shareRatingModal}
      onClose={closeModal}
      title={<Title order={4}>Share your entry</Title>}
      styles={{
        overlay: {
          zIndex,
        },
        inner: {
          zIndex,
        },
      }}
    >
      {!!rating && rating.syncroItemId && (
        <FlexCol w="100%" gap={32}>
          <FlexVCenter>
            <a
              href={urls.others.twitterIntent(urlToCopy, textToShare)}
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'unset',
                textDecoration: 'none',
              }}
            >
              <FlexCol align="center" sx={{ gap: 8 }}>
                <Center
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: theme.colors.blue[5],
                  }}
                >
                  <FaTwitter size="32" />
                </Center>
                Twitter
              </FlexCol>
            </a>
          </FlexVCenter>

          <FlexVCenter
            w="100%"
            gap={4}
            onClick={() => {
              navigator.clipboard.writeText(urlToCopy)
              myNotifications.success('Copied to clipboard')
            }}
          >
            <TextInput
              sx={{
                flexGrow: 1,
              }}
              styles={{
                input: {
                  cursor: 'pointer !important',
                },
              }}
              value={urlToCopy}
              disabled
            />
            <Button>Copy</Button>
          </FlexVCenter>

          {isAfterRating && Boolean(userSettings?.minRatingForSharing) && (
            <FlexVCenter>
              <span>
                This pop-up opens after giving a rating of{' '}
                <b
                  style={{
                    color: theme.colors.yellow[6],
                  }}
                >
                  {userSettings?.minRatingForSharing}
                </b>{' '}
                or more{' '}
                <Text
                  component="span"
                  size="sm"
                  sx={{
                    fontStyle: 'italic',
                    color: theme.colors.gray[6],
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => openMinRatingSharingModal()}
                >
                  (edit)
                </Text>
              </span>
            </FlexVCenter>
          )}
        </FlexCol>
      )}
    </Modal>
  )
}

export default ShareRatingModal
