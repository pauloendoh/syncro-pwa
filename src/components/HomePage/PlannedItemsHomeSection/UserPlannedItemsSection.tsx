import { Box, ScrollArea, Title } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { usePlannedItemsQueryV2 } from '../../../hooks/react-query/interest/usePlannedItemsQueryV2'
import { useUserInfoQuery } from '../../../hooks/react-query/user/useUserInfoQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyPaper from '../../_common/overrides/MyPaper'
import Span from '../../_common/text/Span'
import GridPlannedItemsV2 from './GridPlannedItemsV2/GridPlannedItemsV2'
import PlannedItemTypeButton from './PlannedItemTypeButton/PlannedItemTypeButton'
import PlannedItemsMoreMenu from './PlannedItemsMoreMenu/PlannedItemsMoreMenu'

type Props = {
  userId: string
  titleIsOutside?: boolean
}

const UserPlannedItemsSection = (props: Props) => {
  const [selectedType, setSelectedType] = useState<SyncroItemType>()

  const { data: ratings } = usePlannedItemsQueryV2(props.userId)

  const { data: userInfo } = useUserInfoQuery(props.userId)

  const { authUser } = useAuthStore()

  const isMyPlannedItems = useMemo(
    () => props.userId === authUser?.id,
    [props.userId, authUser?.id]
  )

  const title = useMemo(() => {
    if (isMyPlannedItems) return 'My planned items'

    if (!userInfo?.username) return 'Planned items'

    return `${userInfo.username}'s planned items`
  }, [userInfo?.username, authUser?.username, isMyPlannedItems])

  const [hasAutoSelected, setHasAutoSelected] = useState(false)

  useEffect(() => {
    setHasAutoSelected(false)
  }, [props.userId])

  useEffect(() => {
    if (hasAutoSelected) return
    if (!ratings || ratings.length === 0) return

    // select type with most rating
    const typeMap = new Map<SyncroItemType, number>()
    ratings.forEach((rating) => {
      const type = rating.syncroItem?.type
      if (!type) return

      const currentCount = typeMap.get(type) ?? 0
      typeMap.set(type, currentCount + 1)
    })

    let maxCount = 0
    let maxType: SyncroItemType | undefined

    typeMap.forEach((count, type) => {
      if (count > maxCount) {
        maxCount = count
        maxType = type
      }
    })

    if (maxType) setSelectedType(maxType)

    setHasAutoSelected(true)
  }, [ratings])

  if (!ratings || ratings.length === 0) return null

  return (
    <FlexCol
      gap={8}
      sx={{
        maxWidth: 400,
        justifyContent: 'flex-start',
      }}
    >
      {props.titleIsOutside && (
        <FlexVCenter justify={'space-between'}>
          <Title order={4}>{title}</Title>
          <PlannedItemsMoreMenu />
        </FlexVCenter>
      )}

      <MyPaper
        sx={{
          padding: 0,
          paddingBottom: 16,
        }}
      >
        <FlexCol pb={4}>
          {!props.titleIsOutside && (
            <FlexVCenter justify={'space-between'} p={16}>
              <Span weight={600} size={'lg'}>
                {title}
              </Span>
              {isMyPlannedItems && <PlannedItemsMoreMenu />}
            </FlexVCenter>
          )}

          <FlexVCenter
            gap={8}
            wrap="wrap"
            pt={props.titleIsOutside ? 16 : 0}
            px={16}
          >
            {syncroItemTypes.map((type) => (
              <PlannedItemTypeButton
                userId={props.userId}
                key={type}
                type={type}
                isSelected={type === selectedType}
                onClick={() => setSelectedType(type)}
              />
            ))}
          </FlexVCenter>

          <ScrollArea.Autosize mah={1000} mt={16}>
            <Box sx={{ paddingRight: 16, paddingLeft: 16 }}>
              {selectedType && (
                <GridPlannedItemsV2
                  ratings={ratings}
                  selectedType={selectedType}
                />
              )}
            </Box>
          </ScrollArea.Autosize>
        </FlexCol>
      </MyPaper>
    </FlexCol>
  )
}

export default UserPlannedItemsSection
