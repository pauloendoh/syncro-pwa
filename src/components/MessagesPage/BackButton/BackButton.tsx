import { ActionIcon } from '@mantine/core'
import { useRouter } from 'next/router'
import { RxArrowLeft } from 'react-icons/rx'

type Props = {}

const BackButton = (props: Props) => {
  const router = useRouter()
  return (
    <ActionIcon
      size="xl"
      onClick={() => {
        router.back()
      }}
    >
      <RxArrowLeft fontSize={24} />
    </ActionIcon>
  )
}

export default BackButton
