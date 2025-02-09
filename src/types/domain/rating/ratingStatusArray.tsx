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

export type RatingStatusType = (typeof ratingStatusOptions)[number]

type IconProps = React.ComponentProps<typeof TbProgressCheck>

export const ratingStatusArray: {
  titleLabel: string
  simpleLabel: string
  icon: React.ReactNode
  value: RatingStatusType
  IconWithProps: (props: IconProps) => React.ReactNode
}[] = [
  {
    titleLabel: 'Planned',
    simpleLabel: 'planned',
    icon: <MdBookmark title="Planned" />,
    IconWithProps: (props) => <MdBookmark title="Planned" {...props} />,
    value: 'PLANNED',
  },
  {
    titleLabel: 'In Progress',
    simpleLabel: 'in progress',
    icon: <TbProgressCheck title="In Progress" />,
    IconWithProps: (props: IconProps) => (
      <TbProgressCheck title="In Progress" {...props} />
    ),
    value: 'IN_PROGRESS',
  },
  {
    titleLabel: 'On Hold',
    simpleLabel: 'on hold',
    icon: <MdPauseCircleOutline title="On Hold" />,
    IconWithProps: (props) => (
      <MdPauseCircleOutline title="On Hold" {...props} />
    ),
    value: 'ON_HOLD',
  },
  {
    titleLabel: 'Dropped',
    simpleLabel: 'dropped',
    icon: <IoMdCloseCircleOutline title="Dropped" />,
    IconWithProps: (props) => (
      <IoMdCloseCircleOutline title="Dropped" {...props} />
    ),
    value: 'DROPPED',
  },
  {
    titleLabel: 'Completed',
    simpleLabel: 'completed',
    icon: <MdCheckCircleOutline title="Completed" />,
    IconWithProps: (props) => (
      <MdCheckCircleOutline title="Completed" {...props} />
    ),
    value: 'COMPLETED',
  },
]

export function useRatingStatusMapV2(ratingStatus: RatingStatusType) {
  return ratingStatusArray.find((status) => status.value === ratingStatus)
}

// PE 1/3 - PE 1/3 - kinda weird  using this.. I expect a ratingStatus instead of itemType
export function useRatingStatusMap(itemType: SyncroItemType | undefined) {
  const typeMap = useSyncroItemTypeMap({ itemType })
  const map: {
    // PE 1/3 - use Record
    [key in RatingStatusType]: {
      titleLabel: string
      icon: React.ReactNode
      IconWithProps: (props: IconProps) => React.ReactNode
      value: RatingStatusType
    }
  } = {
    PLANNED: {
      ...ratingStatusArray[0],
      titleLabel: typeMap.planTo,
    },
    IN_PROGRESS: ratingStatusArray[1],
    ON_HOLD: ratingStatusArray[2],
    DROPPED: ratingStatusArray[3],
    COMPLETED: ratingStatusArray[4],
  }

  return map
}
