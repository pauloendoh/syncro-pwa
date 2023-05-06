import { Box, Button, Flex } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { useMemo } from 'react'

interface Props {
  submitButtonId?: string
  isLoading?: boolean
  disabled?: boolean
  onSave?: () => void
  onCancel: () => void
  onEnabledAndCtrlEnter?: () => void
  onEnableAndCtrlS?: () => void
  saveText?: string
  saveWidth?: number
}

const SaveCancelButtons = (props: Props) => {
  useHotkeys(
    [
      [
        'ctrl+enter',
        () => {
          if (
            !props.disabled &&
            !props.isLoading &&
            props.onEnabledAndCtrlEnter
          ) {
            props.onEnabledAndCtrlEnter()
          }
        },
      ],
      [
        'ctrl+s',
        (e) => {
          e.preventDefault()
          if (!props.disabled && !props.isLoading && props.onEnableAndCtrlS) {
            props.onEnableAndCtrlS()
          }
        },
      ],
    ],
    ['input', 'select', 'textarea']
  )

  const label = useMemo(() => {
    if (props.isLoading) {
      return null
    }
    if (props.saveText) {
      return props.saveText
    }
    return 'Save'
  }, [props.isLoading, props.saveText])

  return (
    <Flex>
      <Button
        loading={props.isLoading}
        type="submit"
        variant="filled"
        id={props.submitButtonId}
        disabled={props.disabled || props.isLoading}
        onClick={props.onSave}
        styles={(theme) => ({
          root: {
            width: props.saveWidth || 80,
          },
          leftIcon: {
            marginRight: props.isLoading ? 0 : undefined,
          },
          label: {
            color: props.isLoading
              ? theme.colors.dark[0]
              : theme.colors.dark[0],
          },
        })}
      >
        {label}
      </Button>

      <Box ml={8}>
        <Button onClick={props.onCancel} variant="subtle" color="dark">
          Cancel
        </Button>
      </Box>
    </Flex>
  )
}

export default SaveCancelButtons
