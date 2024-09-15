import { useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useSettingsQuery } from '../../../../../hooks/react-query/user-settings/useSettingsQuery'
import useUpdateSettingsMutation from '../../../../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import { SyncroItemType } from '../../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../../../utils/urls/urls'
import FlexCol from '../../../flex/FlexCol'
import MyTextInput from '../../../inputs/MyTextInput'
import MyLoadingButton from '../../../overrides/MyLoadingButton'

type Props = {
  selectedType: SyncroItemType
}

const OnboardingStep2 = (props: Props) => {
  const theme = useMantineTheme()

  const width = 124
  const [input, setInput] = useState('')

  const { data: settings } = useSettingsQuery()
  const { mutateAsync, isLoading } = useUpdateSettingsMutation()
  const router = useRouter()

  const handleNext = async () => {
    if (!settings) return

    await mutateAsync({
      ...settings,
      onboardingStatus: 'finished',
    })

    router.push(
      urls.pages.search({
        q: input,
        type: props.selectedType,
      })
    )
  }

  const isDisabled = useMemo(() => {
    return input.trim().length === 0
  }, [input])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        handleNext()
      }}
    >
      <FlexCol gap={16}>
        <MyTextInput
          autoFocus
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <MyLoadingButton
          disabled={isDisabled}
          onClick={handleNext}
          loading={isLoading}
          width="100%"
        >
          Next
        </MyLoadingButton>
      </FlexCol>
    </form>
  )
}

export default OnboardingStep2
