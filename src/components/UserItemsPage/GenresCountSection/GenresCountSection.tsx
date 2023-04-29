import { Title, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'
import { useGenresCountQuery } from '../../../hooks/react-query/user-item/useGenresCountQuery'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'

type Props = {
  itemType: SyncroItemType
  userId: string
}

const GenresCountSection = ({ itemType, userId }: Props) => {
  const { data: genresCount } = useGenresCountQuery(itemType, userId)

  const data = useMemo(() => {
    if (!genresCount) return []
    return genresCount.map((g) => ({
      name: g.genre.includes('RPG') ? 'RPG' : g.genre,
      value: g.count,
    }))
  }, [genresCount])

  const theme = useMantineTheme()

  return (
    <FlexCol gap={16}>
      <Title order={4}>Genres</Title>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart height={250}>
          {data.map((entry, index) => (
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              fill={theme.colors.primary[5]}
              cx="50%"
              cy="50%"
              outerRadius={50}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                console.log('handling label?')
                const RADIAN = Math.PI / 180
                // eslint-disable-next-line
                const radius = 25 + innerRadius + (outerRadius - innerRadius)
                // eslint-disable-next-line
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                // eslint-disable-next-line
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    style={{
                      fontWeight: 100,
                    }}
                    fill={theme.colors.dark[0]}
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {data[index].name} ({value})
                  </text>
                )
              }}
            />
          ))}
        </PieChart>
      </ResponsiveContainer>
    </FlexCol>
  )
}

export default GenresCountSection
