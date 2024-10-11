import { ScrollArea } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useSyncroItemDetailsQuery } from '../../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useUsersToRecommendItemQuery } from '../../../../../hooks/react-query/user/useMutualsSavedItemQueryV2'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import textContainsWords from '../../../../../utils/text/textContainsWords'
import FlexCol from '../../../flex/FlexCol'
import MyTextInput from '../../../inputs/MyTextInput'
import CenterLoader from '../../../overrides/CenterLoader/CenterLoader'
import RecommendMutualItem from '../RecommendMutualItem/RecommendMutualItem'

type Props = {
  itemId: string
  maxHeight?: string
}

const RecommendItemToUsersList = (props: Props) => {
  const { data, isLoading } = useUsersToRecommendItemQuery(props.itemId)
  const { data: itemInfo } = useSyncroItemDetailsQuery(props.itemId)

  const [search, setSearch] = useState('')

  const filteredUsers = useMemo(() => {
    return (
      data?.filter((d) => {
        if (textContainsWords(d.user.username, search)) return true

        if (textContainsWords(d.user.email, search)) return true

        if (textContainsWords(d.user.profile.fullName, search)) return true

        return false
      }) || []
    )
  }, [data, search])

  const filteredMutualsOver10 = useMemo(() => {
    return filteredUsers.filter(
      (m) =>
        m.similarity !== undefined && m.similarity.ratedSameItemsCount >= 10
    )
  }, [filteredUsers])

  const filteredMutualsUnder10 = useMemo(() => {
    return filteredUsers
      .filter((m) => {
        const ratedSameItemsCount = m.similarity?.ratedSameItemsCount || 0
        return ratedSameItemsCount < 10
      })
      .sort((a, b) => {
        const aRatedSameItemsCount = a.similarity?.ratedSameItemsCount || 0
        const bRatedSameItemsCount = b.similarity?.ratedSameItemsCount || 0
        return bRatedSameItemsCount - aRatedSameItemsCount
      })
  }, [filteredUsers])

  const visibleMutuals = useMemo(() => {
    return [...filteredMutualsOver10, ...filteredMutualsUnder10]
  }, [filteredMutualsOver10, filteredMutualsUnder10])

  const { isMobile } = useMyMediaQuery()

  return (
    <FlexCol gap={16}>
      <MyTextInput
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search"
      />

      {isLoading && <CenterLoader />}

      {itemInfo && (
        <ScrollArea pr={isMobile ? undefined : 12}>
          <FlexCol
            gap={16}
            sx={{
              maxHeight: props.maxHeight,
            }}
          >
            {visibleMutuals.map((mutual) => (
              <RecommendMutualItem
                key={props.itemId}
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
