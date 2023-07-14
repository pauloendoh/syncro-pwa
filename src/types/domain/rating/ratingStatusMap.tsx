import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdCheckCircleOutline, MdPauseCircleOutline } from 'react-icons/md'
import { TbProgressCheck } from 'react-icons/tb'

export const ratingStatusOptions = [
  'COMPLETED',
  'IN_PROGRESS',
  'ON_HOLD',
  'DROPPED',
] as const

type IconProps = React.ComponentProps<typeof TbProgressCheck>

export const ratingStatusArrayMap: {
  label: string
  icon: React.ReactNode
  value: RatingStatusType
  IconWithProps: (props: IconProps) => React.ReactNode
}[] = [
  {
    label: 'In Progress',
    icon: <TbProgressCheck title="In Progress" />,
    IconWithProps: (props: IconProps) => (
      <TbProgressCheck title="In Progress" {...props} />
    ),
    value: 'IN_PROGRESS',
  },
  {
    label: 'On Hold',
    icon: <MdPauseCircleOutline title="On Hold" />,
    IconWithProps: (props) => (
      <MdPauseCircleOutline title="On Hold" {...props} />
    ),
    value: 'ON_HOLD',
  },
  {
    label: 'Dropped',
    icon: <IoMdCloseCircleOutline title="Dropped" />,
    IconWithProps: (props) => (
      <IoMdCloseCircleOutline title="Dropped" {...props} />
    ),
    value: 'DROPPED',
  },
  {
    label: 'Completed',
    icon: <MdCheckCircleOutline title="Completed" />,
    IconWithProps: (props) => (
      <MdCheckCircleOutline title="Completed" {...props} />
    ),
    value: 'COMPLETED',
  },
]

export type RatingStatusType = (typeof ratingStatusOptions)[number]
