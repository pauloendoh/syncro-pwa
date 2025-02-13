import { Box, Flex, Rating, Text, useMantineTheme } from '@mantine/core'
import { MdStar } from 'react-icons/md'
import { useSettingsQuery } from '../../../../../hooks/react-query/user-settings/useSettingsQuery'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import FlexVCenter from '../../../flex/FlexVCenter'
import MyNumberInput from '../../../inputs/MyNumberInput'
import CenterLoader from '../../../overrides/CenterLoader/CenterLoader'
import { getLabelByRatingValue } from '../getLabelByRatingValue/getLabelByRatingValue'

type Props = {
  value: number | null
  onChange: (value: number) => void
}

const RatingSection = ({ ...props }: Props) => {
  const { isMobile } = useMyMediaQuery()
  const { data: settings, isLoading } = useSettingsQuery()

  const theme = useMantineTheme()

  if (isLoading) {
    return <CenterLoader />
  }
  if (!settings) {
    return 'No settings found'
  }

  if (settings.scoringSystem === 'tenPointsDecimal') {
    return (
      <Flex justify={'flex-start'} w="100%">
        {/* had to add this because number input was getting focused */}
        <input
          style={{
            visibility: 'hidden',

            position: 'absolute',
          }}
        />
        <MyNumberInput
          label={
            <FlexVCenter gap={2}>
              <MdStar color="orange" />
              <span>Your rating</span>
            </FlexVCenter>
          }
          onChange={props.onChange}
          precision={1}
          step={0.1}
          value={props.value}
          w={100}
          max={10}
          min={1}
          autoFocus={false}
        />
      </Flex>
    )
  }

  return (
    <Box className="RatingSection" mt={16}>
      <Rating
        value={props.value || undefined}
        onChange={props.onChange}
        color={props.value === null ? '#343a40' : 'secondary'}
        size={isMobile ? 'lg' : 'xl'}
        count={10}
      />
      <FlexVCenter
        justify={'center'}
        mt={8}
        sx={{
          height: 24,
        }}
      >
        {!!props.value && (
          <Text
            sx={{
              fontWeight: 500,
              color: theme.colors.yellow[5],
            }}
          >
            {getLabelByRatingValue(props.value)}
          </Text>
        )}
      </FlexVCenter>
    </Box>
  )
}

export default RatingSection
