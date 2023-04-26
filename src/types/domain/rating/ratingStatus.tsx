import { CgRadioCheck } from 'react-icons/cg'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdAccessTime, MdCheck } from 'react-icons/md'

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
    icon: <CgRadioCheck />,
    value: 'IN_PROGRESS',
  },
  {
    label: 'On Hold',
    icon: <MdAccessTime />,
    value: 'ON_HOLD',
  },
  {
    label: 'Dropped',
    icon: <IoMdCloseCircleOutline />,
    value: 'DROPPED',
  },
  {
    label: 'Completed',
    icon: <MdCheck />,
    value: 'COMPLETED',
  },
]

export type RatingStatusType = (typeof ratingStatusOptions)[number]
