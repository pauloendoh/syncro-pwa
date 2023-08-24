import { Button } from '@mantine/core'
import { AiOutlineClockCircle } from 'react-icons/ai'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import Span from '../../_common/text/Span'

type Props = {}

const TempUserButton = ({ ...props }: Props) => {
  const axios = useAxios()
  const { setAuthUser } = useAuthStore()

  const handleClick = () => {
    axios.get<AuthUserGetDto>(urls.api.tempUser).then((res) => {
      setAuthUser(res.data)
    })
  }

  return (
    <Button
      leftIcon={<AiOutlineClockCircle size={24} />}
      fullWidth
      color="secondary"
      size="lg"
      onClick={handleClick}
    >
      <Span size="0.8rem" w={160} align="center">
        Test with temporary user
      </Span>
    </Button>
  )
}

export default TempUserButton
