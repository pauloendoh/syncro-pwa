import { Table, Text } from '@mantine/core'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useDailyLoggedUsersQuery } from '../../../hooks/react-query/dashboard/useDailyLoggedUsersQuery'

type Props = {}

const UsersDashboard = ({ ...props }: Props) => {
  const { data, isLoading } = useDailyLoggedUsersQuery()
  const sortedItems = useMemo(() => {
    return data?.sort((a, b) => b.count - a.count) ?? []
  }, [data])

  if (isLoading || !data) return <div>Loading...</div>
  return (
    <div className="UsersDashboard">
      <div>Last logged users (past 30 days)</div>
      <Table
        sx={{
          width: 300,
        }}
        styles={{}}
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Count</th>
            <th>Last logged</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => {
            const today = DateTime.now().setZone('utc').startOf('day')
            const diff = Math.floor(
              today.diff(
                DateTime.fromISO(item.lastLoggedDate?.slice(0, 10)),
                'days'
              ).days
            )

            const getDiffLabel = () => {
              if (diff <= 0) {
                return 'Today'
              }
              if (diff === 1) {
                return 'Yesterday'
              }

              return `${diff} days ago`
            }

            return (
              <tr key={item.userId}>
                <td>
                  <Text truncate maw={120} title={item.username}>
                    {item.username}
                  </Text>
                </td>
                <td>{item.count}</td>
                <td>
                  <span
                    title={DateTime.fromISO(item.lastLoggedDate)
                      .setZone('utc')
                      .toLocaleString()}
                  >
                    {getDiffLabel()}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersDashboard
