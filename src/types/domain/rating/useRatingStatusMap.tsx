import { useMantineTheme } from '@mantine/core'
import { CgRadioCheck } from 'react-icons/cg'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdAccessTime, MdCheckCircleOutline } from 'react-icons/md'
import { RatingStatusType } from './ratingStatus'

export const useRatingStatusMap = (status?: RatingStatusType) => {
  const theme = useMantineTheme()

  const ratingStatusArrayMap: {
    label: string
    icon: React.ReactNode
    value: RatingStatusType
    color: string
  }[] = [
    {
      label: 'In Progress',
      icon: <CgRadioCheck title="In Progress" />,
      value: 'IN_PROGRESS',
      color: theme.colors.blue[6],
    },
    {
      label: 'On Hold',
      icon: <MdAccessTime title="On Hold" />,
      value: 'ON_HOLD',
      color: theme.colors.yellow[6],
    },
    {
      label: 'Dropped',
      icon: <IoMdCloseCircleOutline title="Dropped" />,
      value: 'DROPPED',
      color: theme.colors.red[6],
    },
    {
      label: 'Completed',
      icon: <MdCheckCircleOutline title="Completed" />,
      value: 'COMPLETED',
      color: theme.colors.green[6],
    },
  ]

  const ratingStatus = ratingStatusArrayMap.find((r) => r.value === status)

  return ratingStatus
}
