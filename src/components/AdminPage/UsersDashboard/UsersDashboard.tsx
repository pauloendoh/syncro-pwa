import { Table } from '@mantine/core'
import { useMemo } from 'react'
import { useDailyLoggedUsersQuery } from '../../../hooks/react-query/dashboard/useDailyLoggedUsersQuery'
import MyTimeagoSpan from '../../_common/text/MyTimeagoSpan'

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
          {sortedItems.map((item) => (
            <tr key={item.userId}>
              <td>{item.username}</td>
              <td>{item.count}</td>
              <td>
                <MyTimeagoSpan date={item.lastLoggedDate} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersDashboard
