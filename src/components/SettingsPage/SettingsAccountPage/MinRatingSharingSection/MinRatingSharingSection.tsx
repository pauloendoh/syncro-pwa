import { Box, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { UserSettingsDto } from '../../../../hooks/react-query/user-settings/types/UserSettingsDto'
import useUpdateSettingsMutation from '../../../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import { myNotifications } from '../../../../utils/mantine/myNotifications'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNumberInput from '../../../_common/inputs/MyNumberInput'
import MyInfoIcon from '../../../_common/MyIcons/MyInfoIcon/MyInfoIcon'
import MySpan from '../../../_common/text/MySpan'

type Props = {
  initialSettings: UserSettingsDto
}

const MinRatingSharingSection = ({ ...props }: Props) => {
  const [minRating, setMinRating] = useState<number | null>(
    props.initialSettings.minRatingForSharing
  )

  const [debouncedValue] = useDebouncedValue(minRating, 500)
  const { mutate: submitUpdate } = useUpdateSettingsMutation()

  useEffect(() => {
    if (debouncedValue !== props.initialSettings.minRatingForSharing) {
      submitUpdate(
        {
          ...props.initialSettings,
          minRatingForSharing: debouncedValue,
        },
        {
          onSuccess: () => {
            myNotifications.success('Updated successfully!')
          },
        }
      )
    }
  }, [debouncedValue])

  return (
    <Box className="MinRatingSharingSection" mt={24}>
      <FlexVCenter>
        <MySpan size="sm">Minimum rating for sharing</MySpan>
        <MyInfoIcon text="A sharing pop-up will open after you give a high enough rating." />
      </FlexVCenter>

      <FlexVCenter>
        <MyNumberInput
          onChange={(value) => {
            setMinRating(value)
          }}
          value={minRating}
          precision={1}
          sx={{
            width: 120,
          }}
          min={0}
          max={10}
        />
        {!minRating && (
          <Text size="sm" ml={16}>
            Pop-up won't appear after rating.
          </Text>
        )}
      </FlexVCenter>
    </Box>
  )
}

export default MinRatingSharingSection
