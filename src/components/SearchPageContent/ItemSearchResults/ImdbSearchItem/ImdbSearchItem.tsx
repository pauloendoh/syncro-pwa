import { Flex, Text, useMantineTheme } from '@mantine/core'
import Image from 'next/image'
import { useMemo } from 'react'
import { useMyInterestsQuery } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import { useMyRatingsQuery } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { IImdbResultItem } from '../../../../types/domain/movie/MovieResultResponseDto'
import { getSyncroItemImageOrDefault } from '../../../../utils/image/getSyncroItemImageOrDefault'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import SearchItemYourSection from '../SearchItemYourSection/SearchItemYourSection'
import SearchItemImdbSection from './SearchItemImdbSection/SearchItemImdbSection'

interface Props {
  resultItem: IImdbResultItem
}

// PE 1/3 - unificar no SyncroSearchItem
const ImdbSearchItem = ({ resultItem }: Props) => {
  const theme = useMantineTheme()

  const { data: myRatings } = useMyRatingsQuery()
  const { data: myInterests } = useMyInterestsQuery()

  const myRatingValue = useMemo(
    () =>
      myRatings?.find((rating) => rating.syncroItemId === resultItem.id)
        ?.ratingValue || null,
    [myRatings, resultItem.id]
  )

  const myInterestLevel = useMemo(
    () =>
      myInterests?.find((interest) => interest.syncroItemId === resultItem.id)
        ?.interestLevel || null,
    [myInterests, resultItem.id]
  )

  const { isSmallScreen } = useMyMediaQuery()

  return (
    <Flex gap={16}>
      <MyNextLink href={urls.pages.syncroItem(resultItem.id)}>
        <Image
          src={getSyncroItemImageOrDefault(resultItem?.image?.url)}
          width={100}
          height={100}
          alt={resultItem.title}
          style={{
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />
      </MyNextLink>

      <FlexCol>
        <MyNextLink href={urls.pages.syncroItem(resultItem.id)}>
          <Text
            sx={(theme) => ({
              color: theme.colors.dark[0],
              fontWeight: 500,
            })}
          >
            {resultItem.title} {resultItem.year && `[${resultItem.year}]`}
          </Text>
        </MyNextLink>

        <Flex mt={2}>
          <FlexCol style={{ width: isSmallScreen ? 100 : 120 }}>
            {resultItem.syncroItem ? (
              <SearchItemImdbSection
                avgRating={resultItem.syncroItem?.avgRating}
                ratingCount={resultItem.syncroItem?.ratingCount}
              />
            ) : (
              <MyNextLink href={urls.pages.syncroItem(resultItem.id)}>
                <Text>See details</Text>
              </MyNextLink>
            )}
          </FlexCol>
          <FlexCol style={{ width: isSmallScreen ? 100 : 120 }}>
            {Boolean(myRatingValue || myInterestLevel) && (
              <SearchItemYourSection itemId={resultItem.id} />
            )}
          </FlexCol>
        </Flex>
      </FlexCol>
    </Flex>
  )
}

export default ImdbSearchItem
