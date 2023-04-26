import { CgRadioCheck } from 'react-icons/cg'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdAccessTime, MdCheckCircleOutline } from 'react-icons/md'

export const ratingStatusOptions = [
  'COMPLETED',
  'IN_PROGRESS',
  'ON_HOLD',
  'DROPPED',
] as const

export const ratingStatusArrayMap: {
  label: string
  icon: React.ReactNode
  value: RatingStatusType
}[] = [
  {
    label: 'In Progress',
    icon: <CgRadioCheck title="In Progress" />,
    value: 'IN_PROGRESS',
  },
  {
    label: 'On Hold',
    icon: <MdAccessTime title="On Hold" />,
    value: 'ON_HOLD',
  },
  {
    label: 'Dropped',
    icon: <IoMdCloseCircleOutline title="Dropped" />,
    value: 'DROPPED',
  },
  {
    label: 'Completed',
    icon: <MdCheckCircleOutline title="Completed" />,
    value: 'COMPLETED',
  },
]

export type RatingStatusType = (typeof ratingStatusOptions)[number]
