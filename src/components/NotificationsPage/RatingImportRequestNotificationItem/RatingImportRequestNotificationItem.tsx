import { Box, Text, useMantineTheme } from '@mantine/core'
import Image from 'next/image'
import { format } from 'timeago.js'
import useMalImportResultsModalStore from '../../../hooks/zustand/modals/useMalImportResultsModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { RatingImportRequestDto } from '../../../types/domain/rating-import-request/RatingImportRequestDto'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'

interface Props {
  importRequest: RatingImportRequestDto
  showDot: boolean
}

const RatingImportRequestNotificationItem = ({
  importRequest,
  ...props
}: Props) => {
  const authUser = useAuthStore((s) => s.authUser)

  const theme = useMantineTheme()

  const { openModal } = useMalImportResultsModalStore()
  // copy of UserSearchItem
  return (
    <FlexVCenter justify={'space-between'} p={4}>
      <FlexVCenter>
        <Image
          alt="my-anime-list"
          src={
            'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
          }
          width={36}
          height={36}
          style={{
            borderRadius: 36,
          }}
        />

        <FlexCol ml={16} pr={40}>
          <Text>
            <Text>
              Your MyAnimeList anime ratings import has finished!{' '}
              <Text
                color={theme.colors.primary[9]}
                onClick={() => openModal(importRequest.id)}
              >
                Show results
              </Text>
            </Text>
            {props.showDot && (
              <Box>
                <Box
                  style={{
                    backgroundColor: theme.colors.primary[9],
                    minWidth: 8,
                    minHeight: 8,
                    borderRadius: 8,
                    marginLeft: 8,
                  }}
                />
              </Box>
            )}
          </Text>

          <Text size="sm">{format(importRequest.createdAt)}</Text>
        </FlexCol>
      </FlexVCenter>
    </FlexVCenter>
  )
}

export default RatingImportRequestNotificationItem
