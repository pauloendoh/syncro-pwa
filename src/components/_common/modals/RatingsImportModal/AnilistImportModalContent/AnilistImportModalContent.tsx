import { Box, Flex, Select, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useRef, useState } from 'react'
import useConfirmAnilistImportMutation from '../../../../../hooks/react-query/anilist/useConfirmAnilistImportMutation'
import { urls } from '../../../../../utils/urls/urls'
import { useAxios } from '../../../../../utils/useAxios'
import FlexCol from '../../../flex/FlexCol'
import SaveCancelButtons from '../../../inputs/SaveCancelButtons'

type Props = {
  closeModal: () => void
}

// PE 2/3
const AnilistImportModalContent = (props: Props) => {
  const { mutate: submitUpdate } = useConfirmAnilistImportMutation()

  const [profileUrl, setProfileUrl] = useState('')

  const [debouncedProfileUrl] = useDebouncedValue(profileUrl, 500)

  const [isValid, setIsValid] = useState<boolean>()

  const axios = useAxios()
  const [loading, setLoading] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (debouncedProfileUrl.length > 0) {
      setLoading(true)
      axios
        .get<
          | {
              avatarUrl: string
              profileUrl: string
            }
          | false
        >(
          urls.api.importAnilistValidate({
            url: debouncedProfileUrl,
          })
        )
        .then((res) => {
          setIsValid(!!res.data)
          if (res.data) {
            setAvatarUrl(res.data.avatarUrl)
            setProfileUrl(res.data.profileUrl)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [debouncedProfileUrl])

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 250)
  }, [])

  const [scoringSystem, setScoringSystem] = useState('')

  return (
    <FlexCol gap={16}>
      <Flex align={'flex-end'}>
        <TextInput
          mt={8}
          value={profileUrl}
          onChange={(event) => setProfileUrl(event.currentTarget.value)}
          label="Anilist Profile URL or username"
          placeholder="https://anilist.co/user/username/"
          error={
            profileUrl.length > 0 &&
            isValid === false &&
            'Invalid URL or username'
          }
          w="calc(100% - 40px)"
          ref={inputRef}
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

      <Select
        label="Scoring System"
        value={scoringSystem}
        w={208}
        withinPortal
        error={
          scoringSystem.length === 0 &&
          !!debouncedProfileUrl &&
          'Please select the scoring system you use in Anilist'
        }
        onChange={(value) => {
          if (value !== null) {
            setScoringSystem(value)
          }
        }}
        data={[
          {
            value: '',
            label: '-',
          },
          {
            value: '100 Point',
            label: '100 Point (92/100)',
          },
          {
            value: '10 Point Decimal',
            label: '10 Point Decimal (9.2/10)',
          },
          {
            value: '5 Point',
            label: '5 Point (4/5)',
          },
          {
            value: '3 Point',
            label: '3 Point Smiley :)',
          },
        ]}
      />

      <Box mt={16}>
        <SaveCancelButtons
          isLoading={loading}
          saveText="Import"
          saveWidth={100}
          onCancel={props.closeModal}
          disabled={!isValid || debouncedProfileUrl.length === 0 || loading}
          onSave={() => {
            submitUpdate(
              { url: debouncedProfileUrl, scoringSystem },
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
