import { Box, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useMemo } from 'react'
import { usePlannedItemsQuery } from '../../../hooks/react-query/interest/usePlannedItemsQuery'
import { useUserInfoQuery } from '../../../hooks/react-query/user/useUserInfoQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { localStorageKeys } from '../../../utils/consts/localStorageKeys'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyPaper from '../../_common/overrides/MyPaper'
import DragDropPlannedItems from './DragDropPlannedItems/DragDropPlannedItems'
import PlannedItemButton from './PlannedItemButton/PlannedItemButton'

type Props = {
  userId: string
}

const PlannedItemsHomeSection = (props: Props) => {
  const [selectedType, setSelectedType] = useLocalStorage<SyncroItemType>({
    key: localStorageKeys.plannedItemsSelectedType,
  })

  const { data: savedItems } = usePlannedItemsQuery(props.userId)

  const { data: userInfo } = useUserInfoQuery(props.userId)

  const { authUser } = useAuthStore()

  const title = useMemo(() => {
    if (props.userId === authUser?.id) return 'My planned items'

    if (!userInfo?.username) return 'Planned items'

    return `${userInfo.username}'s planned items`
  }, [userInfo?.username, authUser?.username])

  if (!savedItems || savedItems.length === 0) return null

  return (
    <FlexCol
      gap={16}
      sx={{
        maxWidth: 400,
        justifyContent: 'flex-start',
      }}
    >
      <FlexVCenter>
        <FlexVCenter gap={4}>
          <Title order={5}>{title}</Title>
        </FlexVCenter>
      </FlexVCenter>

      <MyPaper
        sx={{
          padding: 0,
        }}
      >
        <FlexCol>
          <FlexVCenter gap={8} wrap="wrap" p={16}>
            {syncroItemTypes.map((type) => (
              <PlannedItemButton
                userId={props.userId}
                key={type}
                type={type}
                isSelected={type === selectedType}
                onClick={() => setSelectedType(type)}
              />
            ))}
          </FlexVCenter>

          <Box sx={{ paddingRight: 16, paddingLeft: 16 }}>
            <DragDropPlannedItems
              userId={props.userId}
              itemType={selectedType}
            />
          </Box>
        </FlexCol>
      </MyPaper>
    </FlexCol>
  )
}

export default PlannedItemsHomeSection