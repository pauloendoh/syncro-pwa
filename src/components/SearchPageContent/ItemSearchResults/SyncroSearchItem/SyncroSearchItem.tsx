import { Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useMyInterestsQuery } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import { useMyRatingsQuery } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { syncroItemMapping } from '../../../../types/domain/syncro-item/SyncroItemType/syncroItemMapping'
import SyncroItemLink from '../../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../../_common/flex/FlexCol'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import SearchItemLeftSection from '../ImdbSearchItem/SearchItemLeftSection/SearchItemLeftSection'
import SearchItemYourSection from '../SearchItemYourSection/SearchItemYourSection'

interface Props {
  item: SyncroItemDto
  previewWithinPortal?: boolean
}

const SyncroSearchItem = ({ item, ...props }: Props) => {
  const { data: myRatings } = useMyRatingsQuery()
  const { data: myInterests } = useMyInterestsQuery()

  const myRatingValue = useMemo(
    () =>
      myRatings?.find((rating) => rating.syncroItemId === item.id)
        ?.ratingValue || null,
    [myRatings, item.id]
  )

  const myInterestLevel = useMemo(
    () =>
      myInterests?.find((interest) => interest.syncroItemId === item.id)
        ?.interestLevel || null,
    [myInterests, item.id]
  )

  const { isSmallScreen } = useMyMediaQuery()

  return (
    <Flex gap={16}>
      <SyncroItemLink
        item={item}
        previewWithinPortal={props.previewWithinPortal}
      >
        <SyncroItemImage item={item} width={100} height={100} />
      </SyncroItemLink>

      <FlexCol>
        <SyncroItemLink
          item={item}
          previewWithinPortal={props.previewWithinPortal}
        >
          <Text
            sx={(theme) => ({
              color: theme.colors.dark[0],
              fontWeight: 500,
            })}
            lineClamp={2}
          >
            {item.title} {item.year && `[${item.year}]`}
          </Text>
        </SyncroItemLink>

        <Flex mt={2}>
          <FlexCol style={{ width: 120 }}>
            {item.id ? (
              <SearchItemLeftSection
                avgRating={item?.avgRating}
                ratingCount={item?.ratingCount}
                title={syncroItemMapping[item.type].site}
                itemId={item.id}
                item={item}
              />
            ) : (
              <SyncroItemLink item={item}>
                <Text>See details</Text>
              </SyncroItemLink>
            )}
          </FlexCol>
          <FlexCol style={{ width: isSmallScreen ? 100 : 120 }}>
            {Boolean(myRatingValue || myInterestLevel) && (
              <SearchItemYourSection itemId={item.id} />
            )}
          </FlexCol>
        </Flex>
      </FlexCol>
    </Flex>
  )
}

export default SyncroSearchItem
