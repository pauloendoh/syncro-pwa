import { Button } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MessageRoomDto } from '../../../../hooks/react-query/message/types/MessageRoomDto'
import { urls } from '../../../../utils/urls/urls'
import { useAxios } from '../../../../utils/useAxios'

type Props = {
  userId: string
}

const MessageButton = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const axios = useAxios()
  const router = useRouter()

  const handleClick = () => {
    setLoading(true)
    axios
      .get<MessageRoomDto>(urls.api.messageRoomByUserId(props.userId))
      .then((res) => {
        router.push(urls.pages.messageRoom(res.data.id))
      })
      .finally(() => setLoading(false))
  }

  return (
    <Button loading={loading} color={'gray'} onClick={handleClick}>
      Message
    </Button>
  )
}

export default MessageButton
