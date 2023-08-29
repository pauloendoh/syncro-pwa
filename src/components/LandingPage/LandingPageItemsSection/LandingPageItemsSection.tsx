import { Flex, Tabs } from '@mantine/core'
import { useMemo, useState } from 'react'
import { syncroItemTypeOptions } from '../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { useMostRatedItemsQuery } from '../../../hooks/react-query/rating/useMostRatedItemsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FavoriteItem from '../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'

type Props = {}

const LandingPageItemsSection = ({ ...props }: Props) => {
  const [type, setType] = useState<SyncroItemType>('movie')

  const { data, isLoading } = useMostRatedItemsQuery({
    itemType: type,
    period: 'month',
  })

  const tabIndex = useMemo(() => {
    return syncroItemTypeOptions.findIndex((t) => t.itemType === type)
  }, [type])

  const { isMobile } = useMyMediaQuery()

  return (
    <FlexCol className="LandingPageItemsSection" align="center" gap={16}>
      <Tabs
        styles={{
          tabsList: {
            overflowY: 'auto',
            flexWrap: 'unset',
            paddingBottom: 6,
            borderBottom: 'none',
          },
          tabLabel: {
            fontSize: isMobile ? 12 : 16,
            fontWeight: 500,
          },
        }}
        value={tabIndex.toString()}
        onTabChange={(index) => {
          setType(syncroItemTypeOptions[Number(index)].itemType)
        }}
      >
        <Tabs.List>
          {syncroItemTypeOptions.map((t, index) => (
            <Tabs.Tab
              key={t.itemType}
              value={String(index)}
              sx={{
                paddingInline: isMobile ? 10 : undefined,
              }}
            >
              {t.getTypeLabel(true)}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <Flex
        wrap={'wrap'}
        gap={isMobile ? 8 : 16}
        justify={'space-evenly'}
        mih={400}
      >
        {isLoading && <CenterLoader />}
        {data && data.length === 0 && (
          <i
            style={{
              marginTop: 16,
            }}
          >
            Nothing here yet. Be the first to rate something!
          </i>
        )}
        {data?.slice(0, 16).map((item) => (
          <FavoriteItem
            key={item.id}
            item={item}
            alwaysShowTitle
            width={isMobile ? 108 : 200}
            showAvgRating
            disablePreview
          />
        ))}
      </Flex>
    </FlexCol>
  )
}

export default LandingPageItemsSection
