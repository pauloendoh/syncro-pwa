import { Switch } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { DatingProfileDto } from '../../../hooks/react-query/dating/dating-profile/types/DatingProfileDto'
import { useMyDatingProfileQuery } from '../../../hooks/react-query/dating/dating-profile/useMyDatingProfileQuery'
import FlexCol from '../../_common/flex/FlexCol'
import MyTextInput from '../../_common/inputs/MyTextInput'
import DatingLayout from '../DatingLayout/DatingLayout'

type Props = {}

const DatingProfilePage = ({ ...props }: Props) => {
  const { data } = useMyDatingProfileQuery()
  const form = useForm<DatingProfileDto>({
    defaultValues: data,
  })

  return (
    <DatingLayout
      headerRightTitle={
        <Switch
          label={'Open to date'}
          onClick={() => form.setValue('openToDate', !form.watch('openToDate'))}
          checked={form.watch('openToDate')}
          color="secondary"
          labelPosition="left"
        />
      }
    >
      <FlexCol>
        <MyTextInput
          label="First name or nickname"
          value={form.watch('nickname')}
          onChange={(e) => form.setValue('nickname', e.target.value)}
        />
      </FlexCol>
    </DatingLayout>
  )
}

export default DatingProfilePage
