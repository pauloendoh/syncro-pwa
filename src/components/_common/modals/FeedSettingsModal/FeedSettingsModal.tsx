import { Box, Checkbox, Grid, Modal, NumberInput, Title } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { syncroItemOptions } from '../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { UserSettingsDto } from '../../../../hooks/react-query/user-settings/types/UserSettingsDto'
import { useSettingsQuery } from '../../../../hooks/react-query/user-settings/useSettingsQuery'
import useUpdateSettingsMutation from '../../../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useFeedSettingsModal from '../../../../hooks/zustand/modals/useFeedSettingsModal'
import { syncroItemTypes } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { myNotifications } from '../../../../utils/mantine/myNotifications'
import { queryKeys } from '../../../../utils/queryKeys'
import FlexCol from '../../flex/FlexCol'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'

const FeedSettingsModal = () => {
  const { closeModal } = useFeedSettingsModal()

  const { feedSettingsModal } = useMyRouterQuery()
  const { data: userSettings } = useSettingsQuery()
  const { watch, handleSubmit, reset, setValue } = useForm<UserSettingsDto>({
    defaultValues: userSettings,
  })

  useEffect(() => {
    reset(userSettings)
  }, [userSettings])

  const { mutate: submitSettings } = useUpdateSettingsMutation()

  const { userId } = useMyRouterQuery()
  const queryClient = useQueryClient()

  const onSubmit = (data: UserSettingsDto) => {

    submitSettings(data, {
      onSuccess: () => {
        closeModal()
        myNotifications.success('Settings saved!')
        queryClient.invalidateQueries(queryKeys.timelineItems(userId))
      },
    })
  }

  return (
    <Modal
      opened={!!feedSettingsModal}
      onClose={closeModal}
      withCloseButton={false}
      title={<Title order={4}>Feed settings</Title>}
    >
      {watch('feedExcludeItemTypes') && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexCol gap={16}>
            <FlexCol gap={8}>
              <Title order={6}>Item types</Title>
              <Grid>
                {syncroItemTypes.map((itemType) => (
                  <Grid.Col span={4} key={itemType}>
                    <Checkbox
                      styles={{
                        input: {
                          cursor: 'pointer',
                        },
                        label: {
                          cursor: 'pointer',
                        },
                      }}
                      label={syncroItemOptions
                        .find((option) => option.itemType === itemType)
                        ?.getTypeLabel()}
                      checked={
                        !watch('feedExcludeItemTypes').includes(itemType)
                      }
                      onChange={(e) => {
                        const includeType = e.target.checked
                        if (includeType) {
                          setValue(
                            'feedExcludeItemTypes',
                            watch('feedExcludeItemTypes').filter(
                              (type) => type !== itemType
                            )
                          )
                          return
                        }
                        setValue(
                          'feedExcludeItemTypes',
                          watch('feedExcludeItemTypes').concat(itemType)
                        )
                      }}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </FlexCol>

            <NumberInput
              label="Minimum rating"
              value={watch('feedMinimumRating')}
              onChange={(value) => {
                let num = Number(value)
                if (num < 0) num = 0
                if (num > 10) num = 10
                setValue('feedMinimumRating', num)
              }}
              min={0}
              max={10}
              w={120}
            />

            <Box mt={16}>
              <SaveCancelButtons onCancel={closeModal} />
            </Box>
          </FlexCol>
        </form>
      )}
    </Modal>
  )
}

export default FeedSettingsModal
