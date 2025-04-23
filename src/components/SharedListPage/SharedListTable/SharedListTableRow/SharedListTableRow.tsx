import { ActionIcon, Text, useMantineTheme } from '@mantine/core'
import { upToNDecimals } from 'endoh-utils'
import { useMemo } from 'react'
import { RiFireLine } from 'react-icons/ri'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { ParsedSharedListItemDto } from '../../../../hooks/react-query/shared-list/types/ParsedSharedListItemDto'
import { SharedListDto } from '../../../../hooks/react-query/shared-list/types/SharedListDto'
import { SharedListInterestItemDto } from '../../../../hooks/react-query/shared-list/types/SharedListInterestItemDto'
import { useEditSharedListItemInterestModalStore } from '../../../../hooks/zustand/modals/useEditSharedListItemInterestModalStore '
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import SyncroItemLink from '../../../_common/SyncroItemLink/SyncroItemLink'
import Span from '../../../_common/text/Span'
import SyncroItemIcon from '../../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import ItemSavedByPreloaded from '../../../SyncroItemPage/ItemSavedBy/ItemSavedByPreloaded/ItemSavedByPreloaded'

type Props = {
  sharedList: SharedListDto
  data: ParsedSharedListItemDto & {
    averageInterest: number
  }
  myUser: UserSimpleDto
  otherUsers: UserSimpleDto[]
  showItemType?: boolean
}

export const SharedListTableRow = ({
  data: { item, ratings, interests, averageInterest },
  ...props
}: Props) => {
  const { openModal } = useEditSharedListItemInterestModalStore()

  const myInterestItem = useMemo(() => {
    return interests.find((interest) => interest.userId === props.myUser.id)
  }, [interests])

  const theme = useMantineTheme()
  const typeMap = useSyncroItemTypeMap({
    itemType: item.type,
  })

  return (
    <>
      <td>
        <SyncroItemLink item={item}>
          <SyncroItemImage item={item} width={48} />
        </SyncroItemLink>
      </td>

      <td>
        <SyncroItemLink item={item}>
          <Text
            sx={{
              fontSize: 12,
            }}
          >
            {item.title}
          </Text>
        </SyncroItemLink>
        <FlexVCenter opacity={0.66} gap={3}>
          <SyncroItemIcon type={item.type} size={11} />
          <Span size="xs">{typeMap?.getTypeLabel()}</Span>
        </FlexVCenter>

        {ratings.length > 0 && (
          <ItemSavedByPreloaded
            actionOnClick="linkToUser"
            itemId={item.id}
            ratings={ratings}
          />
        )}
      </td>

      <td
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {upToNDecimals(averageInterest, 1) || null}
      </td>
      <td>
        <ActionIcon
          onClick={() => {
            const foundInterest = interests.find(
              (interest) => interest.userId === props.myUser.id
            )
            openModal({
              previousInterest: foundInterest as SharedListInterestItemDto,
              sharedList: props.sharedList,
              syncroItem: item,
            })
          }}
        >
          <FlexVCenter gap={2}>
            {myInterestItem ? (
              <Span
                sx={{
                  fontSize: 12,
                  position: 'relative',
                  top: 1,
                  color: theme.colors.secondary[2],
                }}
              >
                {myInterestItem?.interest}
              </Span>
            ) : (
              <RiFireLine
                style={{
                  color: theme.colors.secondary[9],
                }}
              />
            )}
          </FlexVCenter>
        </ActionIcon>
      </td>
      {props.otherUsers.map((user) => {
        const theirInterestItem = interests.find(
          (interest) => interest.userId === user.id
        )

        return (
          <td
            key={user.id}
            style={{
              textAlign: 'center',
            }}
          >
            {!!theirInterestItem && (
              <Span
                sx={{
                  fontSize: 12,
                  position: 'relative',
                  top: 1,
                }}
              >
                {theirInterestItem.interest}
              </Span>
            )}
          </td>
        )
      })}
    </>
  )
}
