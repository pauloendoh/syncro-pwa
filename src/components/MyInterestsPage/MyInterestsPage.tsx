import { Container, MultiSelect, Table, useMantineTheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useMemo } from 'react'
import { useMyInterestsQueryV2 } from '../../hooks/react-query/rating/useMyInterestsQueryV2'
import { localStorageKeys } from '../../utils/consts/localStorageKeys'
import { zIndexes } from '../../utils/zIndexes'
import FlexCol from '../_common/flex/FlexCol'
import DefaultLayout from '../_common/layout/DefaultLayout'
import CenterLoader from '../_common/overrides/CenterLoader/CenterLoader'
import { MyInterestTableRow } from './MyInterestTableRow/MyInterestTableRow'

export const MyInterestsPage = () => {
  const { data: ratings, isLoading, dataUpdatedAt } = useMyInterestsQueryV2()

  type StatusType = 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD'
  const [statuses, setStatues] = useLocalStorage<StatusType[]>({
    key: localStorageKeys.myInterestsPage.statuses,
    defaultValue: ['PLANNED', 'IN_PROGRESS', 'ON_HOLD'],
  })

  const sortedRatings = useMemo(() => {
    return (ratings ?? [])
      .sort((a, b) => {
        // sort by interest level DESC, nulls first
        if (a.interestLevel === null && b.interestLevel === null) {
          return 0
        }

        if (a.interestLevel === null) {
          return -1
        }

        if (b.interestLevel === null) {
          return 1
        }

        if (a.interestLevel === b.interestLevel) {
          // returns lower hours left first
          return (a.myHoursLeft ?? 0) - (b.myHoursLeft ?? 0)
        }

        return b.interestLevel - a.interestLevel
      })
      .filter((rating) => {
        if (statuses.length === 0) {
          return true
        }

        return statuses.includes(rating.status as StatusType)
      })
  }, [dataUpdatedAt, statuses])

  const theme = useMantineTheme()

  return (
    <DefaultLayout>
      <Container size="xl">
        <FlexCol>
          {isLoading && <CenterLoader />}

          {!isLoading && (
            <FlexCol gap={8}>
              <MultiSelect
                multiple
                value={statuses}
                label={'Filter by status'}
                styles={{
                  root: {
                    width: 340,
                  },
                }}
                data={[
                  { value: 'PLANNED', label: 'Planned' },
                  { value: 'IN_PROGRESS', label: 'In progress' },
                  { value: 'ON_HOLD', label: 'On hold' },
                ]}
                onChange={(values) => setStatues(values as StatusType[])}
              />
              <Table
                highlightOnHover
                sx={{
                  '& th': {
                    position: 'sticky',
                    top: 0,
                    zIndex: zIndexes.mobileHeader + 1,
                    backgroundColor: theme.colors.dark[8],
                  },
                  '.clickable': {
                    ':hover': {
                      cursor: 'pointer',
                      backgroundColor: theme.colors.dark[8],
                    },
                  },
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        width: 40,
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        width: 300,
                      }}
                    >
                      Title
                    </th>

                    <th
                      style={{
                        width: 80,
                        textAlign: 'center',
                      }}
                    >
                      INT
                    </th>
                    <th
                      style={{
                        width: 80,
                        textAlign: 'center',
                      }}
                    >
                      Hours left
                    </th>
                    <th
                      style={{
                        textAlign: 'center',
                        width: 160,
                      }}
                    >
                      Source <br />
                      Rating
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRatings.map((rating, index) => {
                    return (
                      <MyInterestTableRow
                        rating={rating}
                        key={rating.id}
                        index={index} // Pass the index as a prop
                      />
                    )
                  })}
                </tbody>
              </Table>
            </FlexCol>
          )}
        </FlexCol>
      </Container>
    </DefaultLayout>
  )
}
