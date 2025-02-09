import { Container, Select, Table, useMantineTheme } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useUpdateInterestMutationV2 } from '../../hooks/react-query/interest/useUpdateInterestMutationV2'
import { useMyInterestsQueryV2 } from '../../hooks/react-query/rating/useMyInterestsQueryV2'
import { useMyColors } from '../../hooks/useMyColors'
import { zIndexes } from '../../utils/zIndexes'
import FlexCol from '../_common/flex/FlexCol'
import DefaultLayout from '../_common/layout/DefaultLayout'
import CenterLoader from '../_common/overrides/CenterLoader/CenterLoader'
import { MyInterestTableRow } from './MyInterestTableRow/MyInterestTableRow'

export const MyInterestsPage = () => {
  const { data: ratings, isLoading } = useMyInterestsQueryV2()

  type StatusType = 'All' | 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD'
  const [status, setStatus] = useState<StatusType>('All')

  const sortedRatings = useMemo(() => {
    return (ratings ?? [])
      .sort((a, b) => {
        // sort by interest level DESC, nulls first
        if (a.interestLevel === null && b.interestLevel === null) return 0

        if (a.interestLevel === null) return -1
        if (b.interestLevel === null) return 1

        return b.interestLevel - a.interestLevel
      })
      .filter((item) => {
        if (status === 'All') return true
        return item.status === status
      })
  }, [ratings, status])

  const theme = useMantineTheme()
  const myColors = useMyColors()

  const { mutate: submitUpdateInterest } = useUpdateInterestMutationV2()

  return (
    <DefaultLayout>
      <Container size="xl">
        <FlexCol>
          {isLoading && <CenterLoader />}

          {!isLoading && (
            <FlexCol gap={8}>
              <Select
                value={status}
                label={'Filter by status'}
                styles={{
                  root: {
                    width: 160,
                  },
                }}
                data={[
                  { value: 'All', label: 'All' },
                  { value: 'PLANNED', label: 'Planned' },
                  { value: 'IN_PROGRESS', label: 'In progress' },
                  { value: 'ON_HOLD', label: 'On hold' },
                ]}
                onChange={(value) => setStatus(value as StatusType)}
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
                        width: 300,
                      }}
                    >
                      Title
                    </th>

                    <th
                      style={{
                        width: 80,
                      }}
                    >
                      INT
                    </th>
                    <th
                      style={{
                        width: 80,
                      }}
                    >
                      Duration
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
                  {sortedRatings.map((rating) => {
                    return (
                      <MyInterestTableRow rating={rating} key={rating.id} />
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
