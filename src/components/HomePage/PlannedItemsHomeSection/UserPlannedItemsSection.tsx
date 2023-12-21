import { Box, Title } from '@mantine/core'
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
import GridPlannedItemsV2 from './GridPlannedItemsV2/GridPlannedItemsV2'
import PlannedItemTypeButton from './PlannedItemTypeButton/PlannedItemTypeButton'

type Props = {
  userId: string
  titleIsOutside?: boolean
}

const UserPlannedItemsSection = (props: Props) => {
  const [selectedType, setSelectedType] = useState<SyncroItemType>()

  const { data: ratings } = usePlannedItemsQueryV2(props.userId)

  const { data: userInfo } = useUserInfoQuery(props.userId)

  const { authUser } = useAuthStore()

  const title = useMemo(() => {
    if (props.userId === authUser?.id) return 'My planned items'

    if (!userInfo?.username) return 'Planned items'

    return `${userInfo.username}'s planned items`
  }, [userInfo?.username, authUser?.username])

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

      const currentCount = typeMap.get(type) || 0
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
      {props.titleIsOutside && <Title order={4}>{title}</Title>}

      <MyPaper
        sx={{
          padding: 0,
          paddingBottom: 16,
        }}
      >
        <FlexCol pb={4}>
          {!props.titleIsOutside && (
            <Title order={5} p={16} pb={0}>
              {title}
            </Title>
          )}

          <FlexVCenter gap={8} wrap="wrap" p={16}>
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

          <Box sx={{ paddingRight: 16, paddingLeft: 16 }}>
            {selectedType && (
              <GridPlannedItemsV2
                ratings={ratings}
                selectedType={selectedType}
              />
            )}
          </Box>
        </FlexCol>
      </MyPaper>
    </FlexCol>
  )
}

export default UserPlannedItemsSection
