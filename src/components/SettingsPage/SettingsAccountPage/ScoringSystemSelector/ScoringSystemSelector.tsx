import { Select } from '@mantine/core'
import { useMemo } from 'react'
import {
  ScoringSystem,
  scoringSystemMap,
} from '../../../../types/domain/rating/ScoringSystem'

type Props = {
  value: ScoringSystem
  onChange: (value: ScoringSystem) => void
}

const ScoringSystemSelector = ({ ...props }: Props) => {
  const data = useMemo(() => {
    return Object.values(scoringSystemMap).map((scoringSystem) => ({
      value: scoringSystem.type,
      label: scoringSystem.label,
    }))
  }, [])
  return (
    <Select
      label="Scoring system"
      className="ScoringSystemSelector"
      w={240}
      data={data}
      maxDropdownHeight={400}
      value={props.value}
      onChange={(newScoringSystem: ScoringSystem) => {
        props.onChange(newScoringSystem)
      }}
    />
  )
}

export default ScoringSystemSelector
