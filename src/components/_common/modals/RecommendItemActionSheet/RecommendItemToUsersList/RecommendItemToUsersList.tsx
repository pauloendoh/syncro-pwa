import { ScrollArea } from '@mantine/core'
import { useMutualsSavedItemQuery } from '../../../../../hooks/react-query/user/useMutualsSavedItemQuery'
import FlexCol from '../../../flex/FlexCol'
import RecommendMutualItem from '../RecommendMutualItem/RecommendMutualItem'

type Props = {
  itemId: string
  maxHeight?: string
}

const RecommendItemToUsersList = (props: Props) => {
  const { data: mutuals } = useMutualsSavedItemQuery(props.itemId)

  return (
    <ScrollArea>
      <FlexCol
        gap={16}
        sx={{
          maxHeight: props.maxHeight,
          paddingRight: 16,
        }}
      >
        {mutuals?.map((mutual) => (
          <RecommendMutualItem mutual={mutual} itemId={props.itemId} />
        ))}
      </FlexCol>
    </ScrollArea>
  )
}

export default RecommendItemToUsersList
