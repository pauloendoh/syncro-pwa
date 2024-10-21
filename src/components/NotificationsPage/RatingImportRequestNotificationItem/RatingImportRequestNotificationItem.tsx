import { Text, useMantineTheme } from '@mantine/core'
import { format } from 'timeago.js'
import useMalImportResultsModalStore from '../../../hooks/zustand/modals/useMalImportResultsModalStore'
import { useAuthStoreV2 } from '../../../hooks/zustand/useAuthStore'
import { RatingImportRequestDto } from '../../../types/domain/rating-import-request/RatingImportRequestDto'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import Span from '../../_common/text/Span'

interface Props {
  importRequest: RatingImportRequestDto
  showDot: boolean
}

const RatingImportRequestNotificationItem = ({
  importRequest,
  ...props
}: Props) => {
  const authUser = useAuthStoreV2({
    authUser: true,
  })

  const theme = useMantineTheme()

  const { openModal } = useMalImportResultsModalStore()
  // copy of UserSearchItem
  return (
    <FlexVCenter justify={'space-between'} p={4}>
      <FlexVCenter>
        <img
          alt="my-anime-list"
          src={
            'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
          }
          width={36}
          height={36}
          style={{
            borderRadius: 36,
            objectFit: 'cover',
          }}
        />

        <FlexCol ml={16} pr={40}>
          <Span>
            <Span>Your MyAnimeList ratings import has finished!</Span>
            <span
              style={{
                display: 'inline-flex',
              }}
            >
              &nbsp;
              {props.showDot && (
                <div>
                  <div
                    style={{
                      backgroundColor: theme.colors.primary[9],
                      width: 8,
                      height: 8,
                      borderRadius: 8,
                    }}
                  />
                </div>
              )}
            </span>
          </Span>

          <Text size="sm">{format(importRequest.createdAt)}</Text>
        </FlexCol>
      </FlexVCenter>
    </FlexVCenter>
  )
}

export default RatingImportRequestNotificationItem
