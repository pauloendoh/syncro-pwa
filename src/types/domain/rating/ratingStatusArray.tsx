import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import {
  MdBookmark,
  MdCheckCircleOutline,
  MdPauseCircleOutline,
} from 'react-icons/md'
import { TbProgressCheck } from 'react-icons/tb'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { SyncroItemType } from '../syncro-item/SyncroItemType/SyncroItemType'

export const ratingStatusOptions = [
  'COMPLETED',
  'IN_PROGRESS',
  'ON_HOLD',
  'DROPPED',
  'PLANNED',
] as const

type IconProps = React.ComponentProps<typeof TbProgressCheck>

export const ratingStatusArray: {
  label: string
  icon: React.ReactNode
  value: RatingStatusType
  IconWithProps: (props: IconProps) => React.ReactNode
}[] = [
  {
    label: 'Planned',
    icon: <MdBookmark title="Planned" />,
    IconWithProps: (props) => <MdBookmark title="Planned" {...props} />,
    value: 'PLANNED',
  },
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

export function useRatingStatusMap(itemType: SyncroItemType) {
  const typeMap = useSyncroItemTypeMap({ itemType: itemType })
  const map: {
    [key in RatingStatusType]: {
      label: string
      icon: React.ReactNode
      IconWithProps: (props: IconProps) => React.ReactNode
      value: RatingStatusType
    }
  } = {
    PLANNED: {
      ...ratingStatusArray[0],
      label: typeMap.planTo,
    },
    IN_PROGRESS: ratingStatusArray[1],
    ON_HOLD: ratingStatusArray[2],
    DROPPED: ratingStatusArray[3],
    COMPLETED: ratingStatusArray[4],
  }

  return map
}

export type RatingStatusType = (typeof ratingStatusOptions)[number]
