import { Box, FileInput } from '@mantine/core'
import { useState } from 'react'
import useConfirmationModalStore from '../../../../../hooks/zustand/modals/useConfirmationModalStore'
import { myNotifications } from '../../../../../utils/mantine/myNotifications'
import { urls } from '../../../../../utils/urls'
import { useAxios } from '../../../../../utils/useAxios'
import FlexCol from '../../../flex/FlexCol'
import SaveCancelButtons from '../../../inputs/SaveCancelButtons'

type Props = {
  closeModal: () => void
  afterConfirming: () => void
}

const MalAnimeImportModalContent = (props: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const axios = useAxios()

  const { openConfirmDialog } = useConfirmationModalStore()

  const handleUpload = () => {
    if (!file) return
    setIsLoading(true)

    // read xml from file
    const reader = new FileReader()
    reader.onload = (e) => {
      const xml = e.target?.result

      axios
        .post<{
          imageUrl: string
          username: string
        }>(urls.api.uploadMalAnime, xml, {
          headers: {
            'Content-Type': 'text/xml',
          },
        })
        .then(({ data }) => {
          openConfirmDialog({
            title: 'Start importing?',
            description: (
              <Box>
                <Box>Username: {data.username}</Box>
                <img
                  src={data.imageUrl}
                  alt="MAL profile image"
                  style={{ width: 100 }}
                />
              </Box>
            ),
            onConfirm: () => {
              // STOPPED HERE

              props.closeModal()

              axios
                .post(urls.api.confirmUploadMalAnime, xml, {
                  headers: {
                    'Content-Type': 'text/xml',
                  },
                })
                .then(() => {
                  myNotifications.success(
                    'Importing started! You will be notified when it is done.'
                  )
                  props.afterConfirming()
                })
            },
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    // don't remove this, it's needed to read the file
    reader.readAsText(file)
  }

  return (
    <FlexCol gap={16}>
      <ol>
        <li>
          Login to your MyAnimeList account and go to the{' '}
          <a href="https://myanimelist.net/panel.php?go=export">export page</a>
        </li>
        <li>Export your anime or manga list</li>
        <li>Upload the XML file inside the zip file you just downloaded</li>
      </ol>

      <FlexCol gap={24}>
        <FileInput
          accept=".xml"
          label="Upload your MAL anime or manga list XML file"
          onChange={(value) => {
            if (value) {
              setFile(value)
            }
          }}
          value={file}
        />

        <SaveCancelButtons
          onSave={() => handleUpload()}
          isLoading={isLoading}
          onCancel={() => props.closeModal()}
          saveText="Upload"
          saveWidth={120}
          disabled={!file}
        />
      </FlexCol>
    </FlexCol>
  )
}

export default MalAnimeImportModalContent
