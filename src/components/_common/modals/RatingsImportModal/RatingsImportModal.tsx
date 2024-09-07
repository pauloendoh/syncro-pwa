import { Modal } from '@mantine/core'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useImportRatingsModalStore from '../../../../hooks/zustand/modals/useImportRatingsModalStore'
import AnilistImportModalContent from './AnilistImportModalContent/AnilistImportModalContent'
import MalAnimeImportModalContent from './MalAnimeImportModalContent/MalAnimeImportModalContent'
import { ratingsImportOptions } from './ratingsImportOptions/ratingsImportOptions'

// PE 2/3 -
const RatingsImportModal = () => {
  const { initialValue: importType, closeModal } = useImportRatingsModalStore()

  const { importRatings } = useMyRouterQuery()

  const ratingsImportOption = ratingsImportOptions.find(
    (option) => option.type === importType
  )

  return (
    <Modal
      opened={!!importRatings}
      onClose={closeModal}
      title={ratingsImportOption?.title}
    >
      {importType === 'MAL-Anime' && (
        <MalAnimeImportModalContent
          closeModal={() => closeModal()}
          afterConfirming={() => closeModal()}
        />
      )}
      {importType === 'Anilist' && (
        <AnilistImportModalContent closeModal={() => closeModal()} />
      )}
    </Modal>
  )
}

export default RatingsImportModal
