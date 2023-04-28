import { useEffect, useState } from 'react'
import { resetPasswordResetStore } from '../../../hooks/zustand/usePasswordResetStore'
import FlexCol from '../../_common/flex/FlexCol'
import MyTextLink from '../../_common/text/MyTextLink/MyTextLink'
import ConfirmCodeForm from './ConfirmCodeForm/ConfirmCodeForm'
import ConfirmNewPasswordForm from './ConfirmNewPasswordForm/ConfirmNewPasswordForm'
import SendEmailCodeForm from './SendEmailCodeForm/SendEmailCodeForm'

type Stage = 'sendCode' | 'confirmCode' | 'newPassword'

interface Props {
  onChangeForm: () => void
}

const PasswordResetForm = (props: Props) => {
  const [currentStage, setCurrentStage] = useState<Stage>('sendCode')

  useEffect(() => {
    resetPasswordResetStore()
  }, [])

  return (
    <FlexCol py={8} px={4} gap={16} align="center">
      {currentStage === 'sendCode' && (
        <SendEmailCodeForm goNext={() => setCurrentStage('confirmCode')} />
      )}

      {currentStage === 'confirmCode' && (
        <ConfirmCodeForm goNext={() => setCurrentStage('newPassword')} />
      )}

      {currentStage === 'newPassword' && (
        <ConfirmNewPasswordForm goNext={props.onChangeForm} />
      )}

      <MyTextLink />
      <MyTextLink mt={4} onClick={props.onChangeForm}>
        Return to log in
      </MyTextLink>
    </FlexCol>
  )
}

export default PasswordResetForm
