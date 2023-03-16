import { Draggable } from 'react-beautiful-dnd'

import { createStyles, Flex, Text } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { MdDragHandle } from 'react-icons/md'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { InterestDto } from '../../../../types/domain/interest/InterestDto'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../utils/urls'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
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
        <Flex
          gap={8}
          py={8}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={classes.dragHandle} {...provided.dragHandleProps}>
            <MdDragHandle size={20} />
          </div>

          <FlexVCenter justify={'space-between'} w="100%">
            <MyNextLink
              href={urls.pages.syncroItem(syncroItem!.id)}
              onClick={() => handleClick(props.planned)}
            >
              <Text size="sm">{syncroItem?.title}</Text>
            </MyNextLink>
          </FlexVCenter>
        </Flex>
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

    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
  },
}))
