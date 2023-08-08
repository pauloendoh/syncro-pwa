import { Draggable } from 'react-beautiful-dnd'

import { createStyles, Flex, Text } from '@mantine/core'
import { MdDragHandle } from 'react-icons/md'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import SyncroItemLink from '../../../_common/SyncroItemLink/SyncroItemLink'

type Props = {
  item: RatingDto
  index: number
}

const PlannedItem = (props: Props) => {
  const {
    item: { syncroItem },
  } = props

  const { classes } = useStyles()

  if (!syncroItem) return null

  return (
    <Draggable isDragDisabled index={props.index} draggableId={props.item.id}>
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
            <SyncroItemLink item={syncroItem}>
              <SyncroItemImage item={syncroItem} height={64} width={64} />
            </SyncroItemLink>

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
                <SyncroItemLink item={syncroItem}>
                  <Text lineClamp={3}>{syncroItem?.title}</Text>
                </SyncroItemLink>
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
