import { Flex, Text, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useMyInterestsQuery } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import { useMyRatingsQuery } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { syncroItemMapping } from '../../../../types/domain/syncro-item/SyncroItemType/syncroItemMapping'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import SearchItemLeftSection from '../ImdbSearchItem/SearchItemLeftSection/SearchItemLeftSection'
import SearchItemYourSection from '../SearchItemYourSection/SearchItemYourSection'

interface Props {
  item: SyncroItemDto
}

// PE 1/3 - unificar no SyncroSearchItem
const SyncroSearchItem = ({ item }: Props) => {
  const theme = useMantineTheme()

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
      <MyNextLink href={urls.pages.syncroItem(item.id)}>
        <SyncroItemImage item={item} width={100} height={100} />
      </MyNextLink>

      <FlexCol>
        <MyNextLink href={urls.pages.syncroItem(item.id)}>
          <Text
            sx={(theme) => ({
              color: theme.colors.dark[0],
              fontWeight: 500,
            })}
            lineClamp={2}
          >
            {item.title} {item.year && `[${item.year}]`}
          </Text>
        </MyNextLink>

        <Flex mt={2}>
          <FlexCol style={{ width: isSmallScreen ? 100 : 120 }}>
            {item.id ? (
              <SearchItemLeftSection
                avgRating={item?.avgRating}
                ratingCount={item?.ratingCount}
                title={syncroItemMapping[item.type].site}
                itemId={item.id}
                item={item}
              />
            ) : (
              <MyNextLink href={urls.pages.syncroItem(item.id)}>
                <Text>See details</Text>
              </MyNextLink>
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
