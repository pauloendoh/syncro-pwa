import { Table } from '@mantine/core'
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
            const now = DateTime.now()
            const diff = Math.floor(
              now.diff(DateTime.fromISO(item.lastLoggedDate), 'days').days
            )

            const getDiffLabel = () => {
              if (diff === 0) {
                return 'Today'
              }
              if (diff === 1) {
                return 'Yesterday'
              }

              return `${diff} days ago`
            }

            return (
              <tr key={item.userId}>
                <td>{item.username}</td>
                <td>{item.count}</td>
                <td>
                  <span
                    title={new Date(item.lastLoggedDate).toLocaleDateString()}
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
