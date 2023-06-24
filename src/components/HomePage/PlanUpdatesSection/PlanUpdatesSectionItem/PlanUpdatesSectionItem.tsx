import { Box, Flex } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { InterestDto } from '../../../../types/domain/interest/InterestDto'
import { formatShortTimeago } from '../../../../utils/date/formatShortTimeago'
import ItemTitleAndYear from '../../../../utils/domains/syncro-item/ItemTitleAndYear'
import { urls } from '../../../../utils/urls'
import SyncroItemLink from '../../../_common/SyncroItemLink/SyncroItemLink'
import UserProfilePicture from '../../../_common/UserProfilePicture/UserProfilePicture'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'

type Props = {
  item: InterestDto
}

const PlanUpdatesSectionItem = ({ item, ...props }: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: item.syncroItem?.type,
  })

  const { hovered, ref } = useHover()

  return (
    <Flex key={item.id} gap={8} ref={ref}>
      <Box mt={4}>
        <UserProfilePicture userId={item.userId} widthHeigth={32} />
      </Box>

      <FlexCol w="100%" pr={16}>
        <FlexVCenter w="100%" justify={'space-between'}>
          <Span size="sm" weight={'bold'}>
            <MyNextLink href={urls.pages.user(item.userId)}>
              {item.user?.username}
            </MyNextLink>
            <Span size="sm" weight="initial">
              {' '}
              {typeMap?.plansTo}:
            </Span>
          </Span>

          {hovered && (
            <Span size="xs">
              {formatShortTimeago(new Date(item.createdAt))}
            </Span>
          )}
        </FlexVCenter>

        {item.syncroItem && (
          <Span size="sm">
            <SyncroItemLink item={item.syncroItem} previewWithinPortal>
              <ItemTitleAndYear
                item={item.syncroItem}
                showIcon={true}
                yearIconWidth={64}
              />
            </SyncroItemLink>
          </Span>
        )}
      </FlexCol>
    </Flex>
  )
}

export default PlanUpdatesSectionItem
