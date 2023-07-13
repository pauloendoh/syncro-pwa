import { ScrollArea } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useSyncroItemDetailsQuery } from '../../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useUsersToRecommendQuery } from '../../../../../hooks/react-query/user/useMutualsSavedItemQuery'
import textContainsWords from '../../../../../utils/text/textContainsWords'
import FlexCol from '../../../flex/FlexCol'
import MyTextInput from '../../../inputs/MyTextInput'
import RecommendMutualItem from '../RecommendMutualItem/RecommendMutualItem'

type Props = {
  itemId: string
  maxHeight?: string
}

const RecommendItemToUsersList = (props: Props) => {
  const { data } = useUsersToRecommendQuery(props.itemId)
  const { data: itemInfo } = useSyncroItemDetailsQuery(props.itemId)

  const [search, setSearch] = useState('')

  const filteredMutuals = useMemo(() => {
    return (
      data?.filter((d) => {
        if (textContainsWords(d.user.username, search)) return true

        if (textContainsWords(d.user.email, search)) return true

        if (textContainsWords(d.user.profile.fullName, search)) return true

        return false
      }) || []
    )
  }, [data, search])

  return (
    <FlexCol gap={16}>
      <MyTextInput
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search"
      />

      {itemInfo && (
        <ScrollArea>
          <FlexCol
            gap={16}
            sx={{
              maxHeight: props.maxHeight,
            }}
          >
            {filteredMutuals.map((mutual) => (
              <RecommendMutualItem
                mutual={mutual}
                itemId={props.itemId}
                itemType={itemInfo.type}
              />
            ))}
          </FlexCol>
        </ScrollArea>
      )}
    </FlexCol>
  )
}

export default RecommendItemToUsersList
