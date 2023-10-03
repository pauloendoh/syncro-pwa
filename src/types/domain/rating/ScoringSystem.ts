export const scoringSystems = ['tenPoints', 'tenPointsDecimal'] as const

export type ScoringSystem = (typeof scoringSystems)[number]

export const scoringSystemMap: {
  // PE 1/3 - use Record
  [key in ScoringSystem]: {
    type: ScoringSystem
    label: string
  }
} = {
  tenPointsDecimal: {
    type: 'tenPointsDecimal',
    label: '10 Point Decimal (5.5/10)',
  },
  tenPoints: {
    type: 'tenPoints',
    label: '10 Point (5/10)',
  },
}
