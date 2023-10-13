import { Box, Flex, Modal, Select, Text, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useQueryState } from 'next-usequerystate'
import { useEffect, useState } from 'react'
import useUpdateConnectorsMutation from '../../../../hooks/react-query/connectors/useUpdateConnectorsMutation'
import useConnectorsModalStore from '../../../../hooks/zustand/modals/useConnectorsModalStore'
import { QueryParams } from '../../../../utils/queryParams'
import { urls } from '../../../../utils/urls/urls'
import { useAxios } from '../../../../utils/useAxios'
import { connectorOptions } from '../../../SettingsPage/ImportRatingsPage/ConnectorsSection/connectorOptions/connectorOptions'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'

const ConnectorsModal = () => {
  const {
    initialValue,
    closeModal,
    isOpen: modalIsOpen,
    openModal,
  } = useConnectorsModalStore()

  const [queryParam] = useQueryState(QueryParams.connectorsModal)

  const { mutate: submitUpdate } = useUpdateConnectorsMutation()

  useEffect(() => {
    if (!queryParam && modalIsOpen) {
      closeModal()
      return
    }
    if (queryParam && !modalIsOpen) {
      openModal('Anilist')
    }
  }, [queryParam])

  const handleCloseModal = () => [closeModal()]

  const [url, setUrl] = useState('')

  const [debouncedUrl] = useDebouncedValue(url, 500)

  const [isValid, setIsValid] = useState<boolean>()

  const axios = useAxios()
  const [loading, setLoading] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (debouncedUrl.length > 0) {
      setLoading(true)
      axios
        .get<string | false>(
          urls.api.importConnectorsValidate({
            connector: initialValue,
            url: debouncedUrl,
          })
        )
        .then((res) => {
          setIsValid(!!res.data)
          if (res.data) {
            setAvatarUrl(res.data)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [debouncedUrl])

  return (
    <Modal
      opened={!!modalIsOpen}
      onClose={handleCloseModal}
      title={'Connectors'}
      size="xs"
    >
      <Text size="sm" color="dimmed">
        Connected accounts will import ratings <b>automatically</b> every day.
        This way, you can <b>keep using external websites</b> and keep your
        Syncro account up to date.
      </Text>

      <Select
        mt={16}
        data={connectorOptions.map((connector) => ({
          label: connector,
          value: connector,
        }))}
        value={initialValue}
        label="Website"
      />

      <Flex align={'flex-end'}>
        <TextInput
          mt={8}
          value={url}
          onChange={(event) => setUrl(event.currentTarget.value)}
          label="Profile URL"
          placeholder="https://anilist.co/user/username/"
          error={url.length > 0 && isValid === false && 'Invalid URL'}
          w="calc(100% - 40px)"
        />

        {!!avatarUrl && (
          <img
            src={avatarUrl}
            width={32}
            height={32}
            style={{
              borderRadius: '50%',
              marginLeft: 8,
              marginBottom: 2,
            }}
            alt="avatar"
          />
        )}
      </Flex>

      <Box mt={16}>
        <SaveCancelButtons
          isLoading={loading}
          saveText="Connect"
          saveWidth={100}
          onCancel={handleCloseModal}
          disabled={!isValid || debouncedUrl.length === 0 || loading}
          onSave={() => {
            submitUpdate(
              { connector: initialValue, url: debouncedUrl },
              {
                onSuccess: () => {
                  closeModal()
                },
              }
            )
          }}
        />
      </Box>
    </Modal>
  )
}

export default ConnectorsModal
