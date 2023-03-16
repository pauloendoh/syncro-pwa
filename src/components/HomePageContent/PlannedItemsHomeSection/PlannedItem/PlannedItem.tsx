import { Draggable } from 'react-beautiful-dnd'

import { createStyles, Flex, Title } from '@mantine/core'
import { MdDragHandle } from 'react-icons/md'
import { InterestDto } from '../../../../types/domain/interest/InterestDto'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import HomeRatingItemButtons from '../../HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'

type Props = {
  planned: InterestDto
  index: number
}

const PlannedItem = (props: Props) => {
  const {
    planned: { syncroItem },
  } = props

  const { classes } = useStyles()

  return (
    <Draggable index={props.index} draggableId={props.planned.id}>
      {(provided) => (
        <FlexVCenter
          py={8}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={classes.dragHandle} {...provided.dragHandleProps}>
            <MdDragHandle size={20} />
          </div>

          <Flex gap={8}>
            <SyncroItemImage item={syncroItem} height={80} width={80} />

            <FlexCol
              justify={'space-between'}
              sx={() => ({
                fontSize: 13,
                svg: {
                  height: 20,
                },
              })}
            >
              <Title order={6} lineClamp={2}>
                {syncroItem?.title}
              </Title>

              <HomeRatingItemButtons syncroItemId={syncroItem?.id!} gap={0} />
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
    minWidth: 32,
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
