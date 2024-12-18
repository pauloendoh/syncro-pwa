import {
  Box,
  Flex,
  LoadingOverlay,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useClickOutside, usePrevious } from '@mantine/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  SearchParams,
  SearchType,
} from '../../../../../../types/domain/search/SearchParams'
import { SyncroItemDto } from '../../../../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../../../../utils/urls/urls'
import { useAxios } from '../../../../../../utils/useAxios'
import { isSyncroItemType } from '../../../../../SearchPageContent/isSyncroItemType/isSyncroItemType'
import CenterLoader from '../../../../overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../../../overrides/MyNextLink'
import SearchAutocompleteItem from '../SearchAutocompleteItem/SearchAutocompleteItem'

type SearchPreviewDto = {
  item: SyncroItemDto
}

type Props = {
  width: number
  input: string
  inputRef: React.RefObject<HTMLInputElement>
  debouncedInput: string
  selectedType: SyncroItemType
  queryParamQ: string
  queryParamType: SearchParams['type']
}

const SpecificTypePreviewSection = ({ ...props }: Props) => {
  const [previewData, setPreviewData] = useState<SearchPreviewDto[]>([])
  const [loading, setLoading] = useState(false)

  const clickOutsideRef = useClickOutside(() => setPreviewData([]))

  const theme = useMantineTheme()

  const axios = useAxios()

  const cancelController = useRef(new AbortController())

  // PE 2/3 - rename to searchPreviewItems
  const fetchPreviewItems = useCallback(
    async (input: string, selectedType: SearchType) => {
      if (
        // PE 1/3 - pra que isso? Caso eu não tenha modificado o input?
        props.queryParamQ === props.debouncedInput &&
        props.queryParamType === selectedType
      ) {
        setPreviewData([])
        return
      }

      if (!isSyncroItemType(selectedType)) {
        setPreviewData([])
        return
      }

      if (input.length === 0) {
        setPreviewData([])
        return
      }

      setLoading(true)
      cancelController.current.abort()

      await axios
        .get<SearchPreviewDto[]>(
          urls.api.searchAutocomplete({
            q: props.debouncedInput,
            type: selectedType,
          })
        )
        .then((res) => {
          setPreviewData(res.data)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [props.debouncedInput, props.selectedType]
  )

  const previous = usePrevious({
    debouncedInput: props.debouncedInput,
    selectedType: props.selectedType,
    fetchPreviewItems,
  })
  useEffect(() => {
    if (props.inputRef.current) {
      if (previous) {
        props.inputRef.current.removeEventListener(
          'focus',
          () =>
            previous.fetchPreviewItems(
              previous.debouncedInput,
              previous.selectedType
            ),
          false
        )
      }

      props.inputRef.current.addEventListener(
        'focus',
        () => fetchPreviewItems(props.debouncedInput, props.selectedType),
        false
      )
    }

    return () => {
      if (props.inputRef.current) {
        props.inputRef.current.removeEventListener(
          'focus',
          () => fetchPreviewItems(props.debouncedInput, props.selectedType),
          false
        )
      }
    }
  }, [props.debouncedInput, props.selectedType, fetchPreviewItems])

  useEffect(() => {
    fetchPreviewItems(props.debouncedInput, props.selectedType)
  }, [props.debouncedInput, props.selectedType])

  return (
    <div className="SpecificTypePreviewSection">
      {(previewData.length > 0 || loading) && (
        <Paper
          ref={clickOutsideRef}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: props.width,
            zIndex: 100,
            maxHeight: 340,
            overflowY: 'auto',
            backgroundColor: theme.colors.dark[8],
          }}
        >
          <Box pos="relative">
            {previewData.length === 0 && loading && (
              <Box p={16}>
                <CenterLoader width={'100%'} loaderSize={'xs'} />
              </Box>
            )}
            <LoadingOverlay
              mah={340}
              visible={previewData.length > 0 && loading}
            />
            {previewData.length > 0 && (
              <>
                <MyNextLink
                  href={urls.pages.search({
                    q: props.input,
                    type: props.selectedType,
                  })}
                >
                  <Flex
                    p={8}
                    justify="center"
                    sx={{
                      cursor: 'pointer',
                      ':hover': {
                        backgroundColor: theme.colors.dark[4],
                      },
                    }}
                  >
                    <Text color="primary" underline>
                      See all results
                    </Text>
                  </Flex>
                </MyNextLink>
                {previewData.map(({ item }) => (
                  <SearchAutocompleteItem
                    key={item.id}
                    item={item}
                    onClick={() => {
                      setPreviewData([])
                    }}
                  />
                ))}
              </>
            )}
          </Box>
        </Paper>
      )}
    </div>
  )
}

export default SpecificTypePreviewSection
