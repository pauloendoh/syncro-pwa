import { ActionIcon, Flex, Menu } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { useMemo } from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { usePlannedItemsQueryV2 } from '../../../../hooks/react-query/interest/usePlannedItemsQueryV2'
import useMoveToQueuePositionMutation from '../../../../hooks/react-query/rating/useMoveToQueuePositionMutation'
import useRemoveQueuePositionMutation from '../../../../hooks/react-query/rating/useRemoveQueuePositionMutation'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import SyncroItemIcon from '../../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import SyncroItemLink from '../../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import Span from '../../../_common/text/Span'

type Props = {
  entry: RatingDto
  isGeneralQueue?: boolean
}

const GeneralQueueTypeSectionItem = ({ ...props }: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.entry.syncroItem?.type,
  })

  const { isMobile } = useMyMediaQuery()
  const { hovered, ref: hoverRef } = useHover()

  const { getAuthUserId } = useAuthStore()
  const { data: entries } = usePlannedItemsQueryV2(getAuthUserId())

  const generalQueueEntries = useMemo(() => {
    return entries?.filter((entry) => entry.queuePosition !== null) ?? []
  }, [entries])

  const { mutate: submitMoveToQueuePosition } = useMoveToQueuePositionMutation()
  const { mutate: submitRemoveQueuePosition } = useRemoveQueuePositionMutation()

  if (!props.entry.syncroItem) return null

  return (
    <Flex justify={'space-between'} ref={hoverRef}>
      <Flex gap={8}>
        <SyncroItemLink item={props.entry.syncroItem}>
          <SyncroItemImage item={props.entry.syncroItem} width={40} />
        </SyncroItemLink>
        <FlexCol gap={2}>
          <SyncroItemLink item={props.entry.syncroItem}>
            <Span lineClamp={1}>
              {props.isGeneralQueue && `${props.entry.queuePosition}. `}
              {props.entry.syncroItem.title}
            </Span>
          </SyncroItemLink>
          <FlexVCenter opacity={0.6} gap={4}>
            <SyncroItemIcon type={props.entry.syncroItem.type} size={14} />
            <Span size="xs">{typeMap.getTypeLabel()}</Span>
          </FlexVCenter>
        </FlexCol>
      </Flex>

      <Menu>
        <Menu.Target>
          <ActionIcon
            sx={{
              visibility: hovered || isMobile ? 'visible' : 'hidden',
            }}
          >
            <MdMoreHoriz />
          </ActionIcon>
        </Menu.Target>

        {props.isGeneralQueue ? (
          <Menu.Dropdown>
            <Menu.Item
              onClick={(e) => {
                const position = Number(prompt('Enter new position'))
                if (position && position > 0) {
                  submitMoveToQueuePosition({
                    ratingId: props.entry.id,
                    position,
                  })

                  return
                }

                alert('Invalid position')
              }}
            >
              Move to position
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                submitRemoveQueuePosition({
                  ratingId: props.entry.id,
                })
              }}
            >
              Remove from queue
            </Menu.Item>
          </Menu.Dropdown>
        ) : (
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                // move to last position
                submitMoveToQueuePosition({
                  ratingId: props.entry.id,
                  position: generalQueueEntries.length + 1,
                })
              }}
            >
              Move to General Queue
            </Menu.Item>
          </Menu.Dropdown>
        )}
      </Menu>
    </Flex>
  )
}

export default GeneralQueueTypeSectionItem
