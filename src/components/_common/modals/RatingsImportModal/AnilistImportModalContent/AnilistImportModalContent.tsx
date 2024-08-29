import { Box, Flex, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import useUpdateConnectorsMutation from '../../../../../hooks/react-query/connectors/useUpdateConnectorsMutation'
import { urls } from '../../../../../utils/urls/urls'
import { useAxios } from '../../../../../utils/useAxios'
import FlexCol from '../../../flex/FlexCol'
import SaveCancelButtons from '../../../inputs/SaveCancelButtons'

type Props = {
  closeModal: () => void
  afterConfirming: () => void
}

const AnilistImportModalContent = (props: Props) => {
  const { mutate: submitUpdate } = useUpdateConnectorsMutation()

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
            connector: 'Anilist',
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
    <FlexCol gap={16}>
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
          saveText="Import"
          saveWidth={100}
          onCancel={props.closeModal}
          disabled={!isValid || debouncedUrl.length === 0 || loading}
          onSave={() => {
            submitUpdate(
              { connector: 'Anilist', url: debouncedUrl },
              {
                onSuccess: () => {
                  props.closeModal()
                },
              }
            )
          }}
        />
      </Box>
    </FlexCol>
  )
}

export default AnilistImportModalContent
