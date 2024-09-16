import { Flex, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useMyRatingsQuery } from '../../../../../../hooks/react-query/rating/useMyRatingsQuery'
import { SyncroItemDto } from '../../../../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../../../flex/FlexCol'
import SyncroItemImage from '../../../../image/SyncroItemImage/SyncroItemImage'
import UserEntryIcons from '../../../../modals/ItemRatedByModal/ItemRatedByModalItem/UserEntryIcons/UserEntryIcons'
import SyncroItemLink from '../../../../SyncroItemLink/SyncroItemLink'
import { Text } from '../../../../text/Text'

type Props = {
  onClick: () => void
  item: SyncroItemDto
}

const SearchAutocompleteItem = ({ ...props }: Props) => {
  const { data: myRatings } = useMyRatingsQuery()
  const myRating = useMemo(() => {
    return (
      myRatings?.find((rating) => rating.syncroItemId === props.item.id) ?? null
    )
  }, [myRatings])

  const theme = useMantineTheme()

  return (
    <SyncroItemLink
      key={props.item.id}
      item={props.item}
      onClick={() => {
        props.onClick()
      }}
      disablePreview
    >
      <Flex
        p={8}
        gap={8}
        sx={{
          cursor: 'pointer',
          ':hover': {
            backgroundColor: theme.colors.dark[4],
          },
        }}
      >
        <SyncroItemImage item={props.item} height={80} width={80} />
        <FlexCol>
          <Text
            sx={{
              fontWeight: 'bold',
            }}
          >
            {props.item.title}
          </Text>
          {props.item.year ?? <Text>{props.item.year}</Text>}
          {myRating && (
            <UserEntryIcons
              color={theme.colors.secondary[9]}
              rating={myRating}
              clickShouldStopPropagation
              clickShouldPreventDefault
              modalType="edit"
            />
          )}
        </FlexCol>
      </Flex>
    </SyncroItemLink>
  )
}

export default SearchAutocompleteItem
