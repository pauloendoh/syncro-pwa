import { Draggable } from 'react-beautiful-dnd'

import { createStyles, Flex, Text } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { MdDragHandle } from 'react-icons/md'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { InterestDto } from '../../../../types/domain/interest/InterestDto'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../../_common/overrides/MyNextLink'

type Props = {
  planned: InterestDto
  index: number
}

const PlannedItem = (props: Props) => {
  const {
    planned: { syncroItem },
  } = props

  const { classes } = useStyles()

  const queryClient = useQueryClient()
  const handleClick = (interest: InterestDto) => {
    if (interest.syncroItem) {
      queryClient.setQueryData<SyncroItemDto>(
        [urls.api.syncroItemDetails(interest.syncroItem.id)],
        interest.syncroItem
      )
    }
  }

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  return (
    <Draggable index={props.index} draggableId={props.planned.id}>
      {(provided) => (
        <FlexVCenter
          py={8}
          gap={8}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={classes.dragHandle} {...provided.dragHandleProps}>
            <MdDragHandle size={20} />
          </div>

          <Flex
            gap={8}
            sx={{
              flexGrow: 1,
            }}
          >
            <MyNextLink
              href={urls.pages.syncroItem(syncroItem!.id)}
              onClick={() => handleClick(props.planned)}
            >
              <SyncroItemImage item={syncroItem} height={64} width={64} />
            </MyNextLink>

            <FlexCol
              gap={8}
              sx={() => ({
                fontSize: 13,
                flexGrow: 1,
                svg: {
                  height: 20,
                },
              })}
            >
              <Flex justify={'space-between'} w="100%">
                <MyNextLink
                  href={urls.pages.syncroItem(syncroItem!.id)}
                  onClick={() => handleClick(props.planned)}
                >
                  <Text lineClamp={3}>{syncroItem?.title}</Text>
                </MyNextLink>
              </Flex>
            </FlexCol>
          </Flex>
        </FlexVCenter>
      )}
    </Draggable>
  )
}

export default PlannedItem

const useStyles = createStyles((theme) => ({
  dragHandle: {
    ...theme.fn.focusStyles(),

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
  },
}))