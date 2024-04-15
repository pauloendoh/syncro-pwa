import { useMantineTheme } from '@mantine/core'
import { useMyColors } from '../../../../hooks/useMyColors'
import useItemRatedByModalStore from '../../../../hooks/zustand/modals/useItemRatedByModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import UserImage from '../../../_common/image/SyncroItemImage/UserImage/UserImage'
import StatusIcon from '../StatusIcon/StatusIcon'

type Props = {
  itemId: string
  ratings: RatingDto[]
}

const ItemSavedByPreloaded = (props: Props) => {
  const { openModal } = useItemRatedByModalStore()

  const theme = useMantineTheme()
  const myColors = useMyColors()

  return (
    <FlexVCenter
      h={40}
      onClick={() => {
        openModal(props.itemId, 'you-follow')
      }}
      sx={{
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
        }}
      >
        {props.ratings?.map((rating, index) => (
          <div
            key={rating.id}
            style={{
              position: 'relative',
            }}
          >
            <UserImage
              pictureUrl={rating.user?.profile?.pictureUrl}
              username={rating.user?.username}
              widthHeight={24}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -8,
                right: -4,
                fontSize: 10,
                color: myColors.ratingYellow,
                fontWeight: 700,
                background: theme.colors.dark[7],
                borderRadius: '100%',
                textAlign: 'center',
                width: 16,
                height: 16,
              }}
            >
              {rating.ratingValue ? (
                rating.ratingValue
              ) : (
                <StatusIcon status={rating.status} />
              )}
            </div>
          </div>
        ))}
      </div>
    </FlexVCenter>
  )
}

export default ItemSavedByPreloaded
