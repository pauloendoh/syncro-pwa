import { ActionIcon, Tooltip } from '@mantine/core'
import React, { ReactNode } from 'react'
import { GoQuestion } from 'react-icons/go'
import { MdInfo, MdInfoOutline } from 'react-icons/md'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useInfoModalStore from '../../../../hooks/zustand/modals/useInfoModalStore'

type Props = {
  text: ReactNode | string
  useQuestionIconInstead?: boolean
  iconProps?: React.ComponentProps<typeof MdInfo>
}

const MyInfoIcon = ({ ...props }: Props) => {
  const { isMobile, isTouchScreen } = useMyMediaQuery()
  const { openModal } = useInfoModalStore()
  const isClickable = isTouchScreen || isMobile

  return (
    <Tooltip label={props.text} multiline maw={180}>
      <ActionIcon
        sx={{
          ':hover': {
            cursor: isClickable ? 'pointer' : 'default',
            backgroundColor: isClickable ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
          },
        }}
        onClick={(e) => {
          if (isTouchScreen || isMobile) {
            openModal(props.text)
          }
        }}
      >
        {props.useQuestionIconInstead ? (
          <GoQuestion {...props.iconProps} />
        ) : (
          <MdInfoOutline {...props.iconProps} />
        )}
      </ActionIcon>
    </Tooltip>
  )
}

export default MyInfoIcon
