import {
  Button,
  Center,
  Modal,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useMemo } from 'react'
import { FaTwitter } from 'react-icons/fa'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useShareRatingModalStore from '../../../../hooks/zustand/modals/useShareRatingModalStore'
import { myNotifications } from '../../../../utils/mantine/myNotifications'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'

const ShareRatingModal = () => {
  const { initialValue: rating, closeModal } = useShareRatingModalStore()

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
    }/10:\n${item?.title} ${item?.year && `[${item.year}]`}\n\n${
      rating?.review
    }\n\n`

    if (text.length > 270) {
      return text.slice(0, 270) + '..."\n\n'
    }
    return text
  }, [rating, item, typeMap, urlToCopy])

  return (
    <Modal
      opened={!!shareRatingModal}
      onClose={closeModal}
      title={<Title order={4}>Share your rating</Title>}
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
        </FlexCol>
      )}
    </Modal>
  )
}

export default ShareRatingModal
