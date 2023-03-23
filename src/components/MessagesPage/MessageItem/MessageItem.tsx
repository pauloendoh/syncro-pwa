import { useTheme } from '@emotion/react'
import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import React from 'react'
import { MessageDto } from '../../../hooks/react-query/message/types/MessageDto'

type Props = {
  message: MessageDto
  itsMe: boolean
}

const MessageItem = ({ message, itsMe }: Props) => {
  const theme = useMantineTheme()
  return (
    <Flex
      sx={{
        justifyContent: itsMe ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          padding: 8,

          background: itsMe ? theme.colors.secondary[9] : theme.colors.dark[4],
          borderRadius: 8,
          marginBottom: 8,
          maxWidth: '80%',
        }}
      >
        <Text>{message.text}</Text>
      </Box>
    </Flex>
  )
}

export default MessageItem
