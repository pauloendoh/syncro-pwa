import {
  Box,
  Divider,
  Flex,
  Grid,
  Select,
  Switch,
  Textarea,
  useMantineTheme,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  DatingGender,
  DatingGoal,
  DatingLookingFor,
  DatingProfileDto,
} from '../../../hooks/react-query/dating/dating-profile/types/DatingProfileDto'
import { useMyDatingProfileQuery } from '../../../hooks/react-query/dating/dating-profile/useMyDatingProfileQuery'
import { MantineSelectData } from '../../../utils/mantine/types/MantineSelectData'
import { zIndexes } from '../../../utils/zIndexes'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyNumberInput from '../../_common/inputs/MyNumberInput'
import MyTextInput from '../../_common/inputs/MyTextInput'
import SaveCancelButtons from '../../_common/inputs/SaveCancelButtons'
import Span from '../../_common/text/Span'
import DatingLayout from '../DatingLayout/DatingLayout'
import BirthdayDrawer from './BirthdayDrawer/BirthdayDrawer'

type Props = {}

const DatingProfilePage = ({ ...props }: Props) => {
  const { data } = useMyDatingProfileQuery()
  const form = useForm<DatingProfileDto>({
    defaultValues: data,
  })

  const [resetTimes, setResetTimes] = useState(0)

  useEffect(() => {
    form.reset(data)
    setResetTimes((prev) => prev + 1)
  }, [data])

  const [isBirthdayDrawerOpen, setIsBirthdayDrawerOpen] = useState(false)

  const setValueDirty = (
    name: Parameters<typeof form.setValue>[0],
    value: Parameters<typeof form.setValue>[1]
  ) => {
    form.setValue(name, value, { shouldDirty: true })
  }

  const handleChangeTopAchievements = (index: number, value: string) => {
    const newTopAchievements = [...form.watch('topAchievements')]
    newTopAchievements[index] = value
    setValueDirty('topAchievements', newTopAchievements)
  }

  const theme = useMantineTheme()

  const onSubmit = (data: DatingProfileDto) => {
    console.log(data)
  }

  return (
    <DatingLayout
      headerRightTitle={
        <Switch
          label={'Open to date'}
          onClick={() => setValueDirty('openToDate', !form.watch('openToDate'))}
          checked={form.watch('openToDate')}
          color="secondary"
          labelPosition="left"
        />
      }
    >
      <Grid px={0} styles={{}}>
        <Grid.Col span={12}>
          <MyTextInput
            label="First name or nickname"
            value={form.watch('nickname')}
            onChange={(e) => setValueDirty('nickname', e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Gender"
            data={
              [
                {
                  value: 'beyondBinary',
                  label: 'Beyond binary',
                },
                {
                  value: 'man',
                  label: 'Man',
                },
                {
                  value: 'woman',
                  label: 'Woman',
                },
              ] as MantineSelectData<DatingGender>
            }
            value={form.watch('gender')}
            onChange={(value: DatingGender) => setValueDirty('gender', value)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Looking for"
            data={
              [
                {
                  value: 'everyone',
                  label: 'Everyone',
                },
                {
                  value: 'beyondBinary',
                  label: 'Beyond binary',
                },
                {
                  value: 'men',
                  label: 'Men',
                },
                {
                  value: 'women',
                  label: 'Women',
                },
              ] as MantineSelectData<DatingLookingFor>
            }
            value={form.watch('lookingFor')}
            onChange={(value: DatingLookingFor) =>
              setValueDirty('lookingFor', value)
            }
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Box pos="relative">
            <Select
              sx={{
                '.mantine-Select-dropdown': {
                  width: '200px !important',
                  left: '0 !important',
                },
              }}
              maxDropdownHeight={240}
              label="Relationship Goal"
              data={
                [
                  {
                    value: 'stillFiguringItOut',
                    label: 'Still figuring it out',
                  },
                  {
                    value: 'shortTermFun',
                    label: 'Short term fun',
                  },
                  {
                    value: 'longTermPartner',
                    label: 'Long term partner',
                  },
                  {
                    value: 'shortTermOpenToLong',
                    label: 'Short term, open to long',
                  },

                  {
                    value: 'longTermOpenToShort',
                    label: 'Long term, open to short',
                  },

                  {
                    value: 'newFriends',
                    label: 'New friends',
                  },
                ] as MantineSelectData<DatingGoal>
              }
              value={form.watch('goal')}
              onChange={(value: DatingGoal) => setValueDirty('goal', value)}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput
            label="Birthday"
            value={
              form.watch('birthdate')
                ? new Date(form.watch('birthdate')!).toLocaleDateString(
                    undefined,
                    {
                      timeZone: 'UTC',
                    }
                  )
                : ''
            }
            onClick={() => setIsBirthdayDrawerOpen(true)}
          />

          <BirthdayDrawer
            isOpen={isBirthdayDrawerOpen}
            initialValue={form.watch('birthdate') ?? ''}
            onSave={(value) => {
              setValueDirty('birthdate', value)
              setIsBirthdayDrawerOpen(false)
            }}
            onCancel={() => setIsBirthdayDrawerOpen(false)}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyNumberInput
            label="Height (in cm)"
            value={form.watch('heightInCm')}
            onChange={(val) => setValueDirty('heightInCm', val)}
            precision={0}
            max={300}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <MyTextInput
            placeholder="Sao Paulo, Brazil"
            label="Lives in"
            value={form.watch('location')}
            onChange={(e) => setValueDirty('location', e.target.value)}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <FlexCol>
            <Textarea
              label="About me"
              placeholder="I like turtles :D"
              value={form.watch('aboutMe')}
              autosize
              minRows={3}
              maxLength={500}
              onChange={(e) => setValueDirty('aboutMe', e.target.value)}
            />
            <Flex justify={'flex-end'}>
              <Span
                size="sm"
                opacity={0.5}
                sx={{
                  visibility:
                    form.watch('aboutMe')?.length > 0 ? 'visible' : 'hidden',
                }}
              >
                {form.watch('aboutMe')?.length || 0}/500
              </Span>
            </Flex>
          </FlexCol>
        </Grid.Col>
      </Grid>
      <Divider />
      <Span mt={16}>Top personal achievements</Span>
      {Array.isArray(form.watch('topAchievements')) && (
        <FlexCol gap={4} mt={16} key={resetTimes}>
          {[
            'Opened a startup',
            'Graduated from college',
            'Got Challenger in League of Legends',
            '30 years without kissing anyone',
            'Achieved 1000 entries at Syncro',
          ].map((placeholder, index) => (
            <MyTextInput
              key={placeholder}
              label={`Top ${index + 1}`}
              value={form.watch('topAchievements')[index]}
              onChange={(e) =>
                handleChangeTopAchievements(index, e.target.value)
              }
              placeholder={placeholder}
            />
          ))}
        </FlexCol>
      )}

      <Box h={100} />

      <FlexVCenter
        sx={{
          position: 'fixed',
          bottom: 60,
          left: 0,
          height: 64,
          justifyContent: 'center',
          width: '100%',
          background: theme.colors.dark[7],
          borderTop: `1px solid ${theme.colors.dark[5]}`,
          zIndex: zIndexes.navbarFooter + 1,

          visibility: form.formState.isDirty ? 'visible' : 'hidden',
          opacity: form.formState.isDirty ? 1 : 0,

          transition: 'visibility 0s, opacity 0.3s',
        }}
      >
        <SaveCancelButtons
          disabled={!form.formState.isDirty}
          isLoading={form.formState.isSubmitting}
          onCancel={() => {
            form.reset(data)
            setResetTimes((prev) => prev + 1)
          }}
          onSave={() => onSubmit(form.getValues())}
        />
      </FlexVCenter>
    </DatingLayout>
  )
}

export default DatingProfilePage
