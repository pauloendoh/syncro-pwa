import { ActionIcon, Modal, Text, useMantineTheme } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useSettingsQuery } from '../../../../hooks/react-query/user-settings/useSettingsQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useOnboardingModalStore from '../../../../hooks/zustand/modals/useOnboardingModalStore'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import MyIcons from '../../MyIcons/MyIcons'
import FlexVCenter from '../../flex/FlexVCenter'
import OnboardingStep1 from './OnboardingStep1/OnboardingStep1'
import OnboardingStep2 from './OnboardingStep2/OnboardingStep2'

const OnboardingModal = () => {
  const { closeModal } = useOnboardingModalStore()

  const [selectedFavorite, setSelectedFavorite] =
    useState<SyncroItemType | null>(null)

  const theme = useMantineTheme()

  const { data: settings } = useSettingsQuery()

  const title = useMemo(() => {
    if (!selectedFavorite) return 'What is your favorite type of media?'
    return 'blabla'
  }, [settings])

  const typeMap = useSyncroItemTypeMap({
    itemType: selectedFavorite || undefined,
  })

  const { onboardingModal } = useMyRouterQuery()

  return (
    <Modal
      opened={!!onboardingModal}
      onClose={closeModal}
      withCloseButton={false}
      title={
        selectedFavorite === null ? (
          'What is your favorite type of media?'
        ) : (
          <FlexVCenter gap={4}>
            <ActionIcon onClick={() => setSelectedFavorite(null)}>
              <MyIcons.ArrowLeftBack />
            </ActionIcon>

            <Text>{typeMap.onboardingSearchQuestion}</Text>
          </FlexVCenter>
        )
      }
      size="xs"
    >
      {selectedFavorite === null && (
        <OnboardingStep1 onSelectType={setSelectedFavorite} />
      )}

      {!!selectedFavorite && (
        <OnboardingStep2 selectedType={selectedFavorite} />
      )}
    </Modal>
  )
}

export default OnboardingModal
