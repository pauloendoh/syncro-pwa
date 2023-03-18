import { Box, Center, useMantineTheme } from '@mantine/core'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { getSyncroItemImageOrDefault } from '../../../../utils/image/getSyncroItemImageOrDefault'
import SyncroItemIcon from '../../../HomePageContent/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'

type Props = {
  item?: SyncroItemDto
  width?: number
  height?: number
  showItemType?: SyncroItemType
}

const SyncroItemImage = (props: Props) => {
  const theme = useMantineTheme()
  return (
    <Box pos="relative">
      <img
        width={props.width || 100}
        height={props.height || 100}
        src={getSyncroItemImageOrDefault(props.item?.imageUrl)}
        alt={props.item?.title || 'syncro-item'}
        style={{
          objectFit: 'cover',
          borderRadius: 4,
        }}
      />
      {props.showItemType && (
        <Center
          pos="absolute"
          right={2}
          bottom={2}
          title={props.showItemType}
          sx={{
            backgroundColor: theme.colors.gray[9],
            width: 32,
            height: 32,
            borderRadius: '50%',
          }}
        >
          <SyncroItemIcon type={props.showItemType} size={16} />
        </Center>
      )}
    </Box>
  )
}

export default SyncroItemImage
