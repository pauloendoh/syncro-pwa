import { Modal, useMantineTheme } from '@mantine/core'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useImportRatingsModalStore from '../../../../hooks/zustand/modals/useImportRatingsModalStore'
import AnilistImportModalContent from './AnilistImportModalContent/AnilistImportModalContent'
import MalAnimeImportModalContent from './MalAnimeImportModalContent/MalAnimeImportModalContent'
import { ratingsImportOptions } from './ratingsImportOptions/ratingsImportOptions'

const RatingsImportModal = () => {
  const { initialValue: importType, closeModal } = useImportRatingsModalStore()

  const theme = useMantineTheme()

  const { importRatings } = useMyRouterQuery()

  const option = ratingsImportOptions.find(
    (option) => option.type === importType
  )

  return (
    <Modal opened={!!importRatings} onClose={closeModal} title={option?.title}>
      {importType === 'MAL-Anime' && (
        <MalAnimeImportModalContent
          closeModal={() => closeModal()}
          afterConfirming={() => closeModal()}
        />
      )}
      {importType === 'Anilist' && (
        <AnilistImportModalContent
          closeModal={() => closeModal()}
          afterConfirming={() => closeModal()}
        />
      )}
    </Modal>
  )
}

export default RatingsImportModal
