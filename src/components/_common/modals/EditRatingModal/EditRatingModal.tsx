import {
  Alert,
  Anchor,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Modal,
  ScrollArea,
  Skeleton,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdInfo } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import useDeleteRatingMutation from '../../../../hooks/react-query/rating/useDeleteRatingMutation'
import useSaveRatingMutation from '../../../../hooks/react-query/rating/useSaveRatingMutation/useSaveRatingMutation'
import { useUserRatingsQuery } from '../../../../hooks/react-query/rating/useUserRatingsQuery'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useSettingsQuery } from '../../../../hooks/react-query/user-settings/useSettingsQuery'
import useUpdateSettingsMutation from '../../../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import { useUsersToRecommendQueryV2 } from '../../../../hooks/react-query/user/useMutualsSavedItemQueryV2'
import useConfirmTabClose from '../../../../hooks/useConfirmTabClose'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useModalZIndex } from '../../../../hooks/utils/useModalZIndexState'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'
import useSaveRatingModalStore from '../../../../hooks/zustand/modals/useSaveRatingModalStore'
import useShareRatingModalStore from '../../../../hooks/zustand/modals/useShareRatingModalStore'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import {
  RatingDto,
  buildRatingDto,
} from '../../../../types/domain/rating/RatingDto'
import { QueryParams } from '../../../../utils/queryParams'
import { capitalize } from '../../../../utils/text/capitalize'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import MyNumberInput from '../../inputs/MyNumberInput'
import MyTextInput from '../../inputs/MyTextInput'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
import Span from '../../text/Span'
import RecommendItemToUsersList from '../RecommendItemModal/RecommendItemToUsersList/RecommendItemToUsersList'
import RatingProgressFields from './RatingProgressFields/RatingProgressFields'
import RatingSection from './RatingSection/RatingSection'
import RatingStatusSelector from './RatingStatusSelector/RatingStatusSelector'
import ShareFavoriteScenesSection from './ShareFavoriteScenesSection/ShareFavoriteScenesSection'

const EditRatingModal = () => {
  const {
    initialValue,
    closeModal,
    isOpen: modalIsOpen,
    openModal,
  } = useSaveRatingModalStore()

  const [ratingDetailsId, setRatingDetailsId] = useQueryState('ratingDetailsId')

  const ratingDetailsModalIsOpen = !!ratingDetailsId

  const [queryParam] = useQueryState(QueryParams.saveRatingModal)

  const { mutate: submitSaveRating, isLoading: isLoadingMutation } =
    useSaveRatingMutation()

  const { openModal: openShareRatingModal } = useShareRatingModalStore()
  const { data: userSettings } = useSettingsQuery()
  const { mutate: submitUpdateSettings } = useUpdateSettingsMutation()

  const { getAuthUserId } = useAuthStore()
  const { data: userRatings } = useUserRatingsQuery(getAuthUserId())

  const onSubmit = async (data: RatingDto) => {
    submitSaveRating(data, {
      onSuccess: () => {
        const minRating = userSettings?.minRatingForSharing ?? 0
        const ratingsCount = userRatings?.length ?? 0

        if (minRating === 0 || ratingsCount < 5) {
          closeBothModals()
          return
        }

        const prevRating = initialValue?.ratingValue ?? 0
        const newRating = data.ratingValue ?? 0

        // WAIT FOR BETTER SHARING MODAL
        // if (prevRating < minRating && newRating >= minRating) {
        //   openShareRatingModal(data, { isAfterRating: true })
        // }
        closeBothModals()
      },
    })
  }

  const theme = useMantineTheme()

  const { data: syncroItem, isLoading: isLoadingItemInfo } =
    useSyncroItemDetailsQuery(initialValue?.syncroItemId)

  const form = useForm<RatingDto>({
    defaultValues: initialValue || buildRatingDto(),
  })

  const typeMap = useSyncroItemTypeMap({ itemType: syncroItem?.type })

  useEffect(() => {
    if (modalIsOpen) {
      const newRating = buildRatingDto({
        syncroItemId: syncroItem?.id,
      })
      form.reset(initialValue || newRating)
      setSelectedCompletedOnce(false)
      setHasAutomaticallyChangedCount(false)
    }
  }, [modalIsOpen])

  useEffect(() => {
    if (!queryParam && modalIsOpen) {
      closeModal()
      return
    }
    if (queryParam && !modalIsOpen) {
      const newRating = buildRatingDto({
        syncroItemId: syncroItem?.id,
      })
      openModal(initialValue || newRating)
    }
  }, [queryParam])

  useConfirmTabClose(form.formState.isDirty && !!modalIsOpen)

  const handleCloseModal = useCallback(() => {
    if (form.formState.isDirty && !!modalIsOpen) {
      openConfirmDialog({
        title: 'Unsaved changes',
        description:
          'Are you sure you want to close this modal? Your changes will not be saved.',
        onConfirm: () => {
          closeModal()
        },
      })
      return
    }

    closeModal()
  }, [form.formState.isDirty, !!modalIsOpen])

  const handleChangeRating = (newRating: number) => {
    if (newRating === form.watch('ratingValue')) {
      form.setValue('ratingValue', null, { shouldDirty: true })
      return
    }

    form.setValue('ratingValue', newRating, { shouldDirty: true })
  }

  const closeBothModals = () => {
    closeModal()
    if (ratingDetailsModalIsOpen) {
      setRatingDetailsId(null, { scroll: false })
    }
  }

  const { mutate: submitDeleteRating } = useDeleteRatingMutation()
  const { openConfirmDialog } = useConfirmationModalStore()
  const handleDelete = () => {
    if (initialValue) {
      openConfirmDialog({
        title: 'Delete entry',
        description: 'Are you sure you want to delete this entry?',
        onConfirm: () => {
          submitDeleteRating(initialValue.id, {
            onSuccess: () => {
              closeBothModals()
            },
          })
        },
      })
    }
  }

  const { isMobile } = useMyMediaQuery()

  const { data: usersToRecommend } = useUsersToRecommendQueryV2(
    initialValue?.syncroItemId || undefined
  )

  const zIndex = useModalZIndex({
    isOpen: !!modalIsOpen,
  })

  const [selectedCompletedOnce, setSelectedCompletedOnce] = useState(false)
  useEffect(() => {
    if (form.watch('status') === 'COMPLETED' && !selectedCompletedOnce) {
      setSelectedCompletedOnce(true)
    }
  }, [form.watch('status')])

  const completedCountInputLabel = useMemo(() => {
    const diff =
      form.watch('completedCount') - (initialValue?.completedCount ?? 0)
    let diffString = ''
    if (diff > 0) {
      diffString += ` (+${diff})`
    }
    if (diff < 0) {
      diffString += ` (${diff})`
    }

    return (
      <Span>
        <Span>{capitalize(typeMap?.getVerb())} count</Span>
        {!!diffString && (
          <Span color={diff > 0 ? theme.colors.green[6] : theme.colors.red[6]}>
            {diffString}
          </Span>
        )}
        <Span></Span>
      </Span>
    )
  }, [form.watch('completedCount'), initialValue?.completedCount])

  const [hasAutomaticallyChangedCount, setHasAutomaticallyChangedCount] =
    useState(false)

  return (
    <Modal
      opened={!!modalIsOpen}
      onClose={handleCloseModal}
      title={
        <FlexVCenter justify="space-between">
          {isLoadingItemInfo ? (
            <Skeleton height={24} radius="md" />
          ) : (
            <Title order={4}>
              <Title order={4}>{syncroItem?.title}</Title>
            </Title>
          )}
        </FlexVCenter>
      }
      withCloseButton={isMobile}
      styles={{
        overlay: {
          zIndex,
        },
        inner: {
          zIndex,
        },
        header: {
          background: theme.colors.dark[7],
          paddingBottom: 0,
        },
        title: {
          paddingBottom: 8,
        },
      }}
      fullScreen={isMobile}
      scrollAreaComponent={isMobile ? undefined : ScrollArea.Autosize}
    >
      <FlexCol pr={12}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {userSettings?.showDefaultStatusIsInProgressNow &&
            !form.watch('id') && (
              <Alert
                mt={24}
                variant="light"
                color="blue"
                icon={<MdInfo />}
                withCloseButton
                onClose={() => {
                  submitUpdateSettings({
                    ...userSettings,
                    showDefaultStatusIsInProgressNow: false,
                  })
                }}
                styles={{
                  icon: {
                    marginRight: 4,
                  },
                }}
              >
                Default status is "In progress" instead of "Completed", now.
              </Alert>
            )}

          <Flex mt={16} justify={'space-between'} w="100%">
            {syncroItem && (
              <RatingStatusSelector
                itemType={syncroItem.type}
                value={form.watch('status')}
                onChange={({ newValue, prevValue }) => {
                  form.setValue('status', newValue, { shouldDirty: true })

                  if (
                    initialValue?.status === 'COMPLETED' &&
                    prevValue === 'COMPLETED' &&
                    newValue !== 'COMPLETED'
                  ) {
                    return
                  }

                  if (
                    initialValue?.status !== 'COMPLETED' &&
                    newValue === 'COMPLETED'
                  ) {
                    if (form.formState.dirtyFields.completedCount) {
                      return
                    }

                    form.setValue(
                      'completedCount',
                      form.watch('completedCount') + 1
                    )
                    setHasAutomaticallyChangedCount(true)
                    return
                  }

                  if (
                    initialValue?.status !== 'COMPLETED' &&
                    prevValue === 'COMPLETED' &&
                    newValue !== 'COMPLETED'
                  ) {
                    if (hasAutomaticallyChangedCount) {
                      form.setValue(
                        'completedCount',
                        initialValue?.completedCount ?? 0
                      )

                      setHasAutomaticallyChangedCount(false)
                    }
                  }
                }}
                width={180}
              />
            )}
          </Flex>

          <FlexVCenter
            mt={16}
            sx={{
              justifyContent: 'center',
            }}
          >
            <RatingSection
              value={form.watch('ratingValue')}
              onChange={handleChangeRating}
            />
          </FlexVCenter>

          {syncroItem &&
            form.watch('ratingProgress') &&
            syncroItem.type !== 'movie' && (
              <FlexVCenter mt={16}>
                <RatingProgressFields
                  value={form.watch('ratingProgress')!}
                  onChange={(value) =>
                    form.setValue('ratingProgress', value, {
                      shouldDirty: true,
                    })
                  }
                  item={syncroItem}
                  status={form.watch('status')}
                />
              </FlexVCenter>
            )}

          <Textarea
            label="Review"
            {...form.register('review')}
            placeholder="Write a review..."
            autosize
            minRows={3}
            styles={{
              root: {
                marginTop: 20,
              },
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                if (initialValue) onSubmit(form.watch())
              }
            }}
          />

          <Box mt={16}>
            <ShareFavoriteScenesSection
              values={form.watch('scenes') || []}
              onChange={(values) => form.setValue('scenes', values)}
            />
          </Box>

          <FlexVCenter mt={16} gap={16}>
            <MyNumberInput
              label={completedCountInputLabel}
              onChange={(value) =>
                form.setValue('completedCount', value, { shouldDirty: true })
              }
              precision={0}
              value={form.watch('completedCount')}
              w={120}
            />

            <MyTextInput
              sx={{
                flexGrow: 1,
              }}
              {...form.register('consumedOn')}
              label={`Last ${typeMap?.getVerb({ isPast: true })} on`}
              placeholder={typeMap?.consumedOnExamples}
              error={
                form.watch('consumedOn').length > 16 && 'Max 16 characters'
              }
            />
          </FlexVCenter>

          <Box mt={16}>
            <Checkbox
              label="Private"
              checked={form.watch('isPrivate')}
              onChange={(e) => {
                form.setValue('isPrivate', e.target.checked)
              }}
            />
          </Box>

          {Boolean(form.watch('importedFromUrl')) && (
            <Box mt={16}>
              <Span>
                Your rating came from{' '}
                <Anchor href={form.watch('importedFromUrl')!} target="_blank">
                  {form.watch('importedFromUrl')}
                </Anchor>
              </Span>
            </Box>
          )}

          <FlexVCenter mt={32} justify="space-between">
            <SaveCancelButtons
              isLoading={isLoadingMutation}
              onCancel={handleCloseModal}
            />
            {!!initialValue?.id && (
              <Button onClick={handleDelete} color="red" variant="outline">
                Delete
              </Button>
            )}
          </FlexVCenter>
        </form>

        {!!initialValue?.syncroItemId &&
          !!form.watch('ratingValue') &&
          form.watch('ratingValue')! >= 8 &&
          !!usersToRecommend?.length && (
            <FlexCol mt={40} gap={16} pb={16}>
              <Divider />
              <Title order={4}>Recommend to users</Title>

              <RecommendItemToUsersList itemId={initialValue.syncroItemId} />
            </FlexCol>
          )}
      </FlexCol>
    </Modal>
  )
}

export default EditRatingModal
