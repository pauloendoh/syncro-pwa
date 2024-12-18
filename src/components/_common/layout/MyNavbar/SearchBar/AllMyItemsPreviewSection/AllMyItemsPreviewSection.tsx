import {
  Box,
  Flex,
  LoadingOverlay,
  Paper,
  useMantineTheme,
} from '@mantine/core'
import { useClickOutside, usePrevious } from '@mantine/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RatingDto } from '../../../../../../types/domain/rating/RatingDto'
import { SearchParams } from '../../../../../../types/domain/search/SearchParams'
import { SyncroItemDto } from '../../../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../../../utils/urls/urls'
import { useAxios } from '../../../../../../utils/useAxios'
import CenterLoader from '../../../../overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../../../overrides/MyNextLink'
import Span from '../../../../text/Span'
import SearchAutocompleteItem from '../SearchAutocompleteItem/SearchAutocompleteItem'

type MyEntrySearchDto = {
  entry: RatingDto
  item: SyncroItemDto
}

type Props = {
  width: number
  input: string
  inputRef: React.RefObject<HTMLInputElement>
  debouncedInput: string
  queryParamQ: string
  queryParamType: SearchParams['type']
}

const AllMyItemsPreviewSection = ({ ...props }: Props) => {
  const [previewData, setPreviewData] = useState<MyEntrySearchDto[]>([])
  const [loading, setLoading] = useState(false)

  const clickOutsideRef = useClickOutside(() => setPreviewData([]))

  const theme = useMantineTheme()

  const axios = useAxios()

  const cancelController = useRef(new AbortController())

  const fetchPreviewItems = useCallback(
    async (input: string) => {
      if (
        // PE 1/3 - pra que isso? Caso eu não tenha modificado o input?
        props.queryParamQ === props.debouncedInput
      ) {
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
        .get<MyEntrySearchDto[]>(urls.api.searchMyEntries(props.debouncedInput))
        .then((res) => {
          setPreviewData(res.data)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [props.debouncedInput]
  )

  const previous = usePrevious({
    debouncedInput: props.debouncedInput,
    fetchPreviewItems,
  })
  useEffect(() => {
    if (props.inputRef.current) {
      if (previous) {
        props.inputRef.current.removeEventListener(
          'focus',
          () => previous.fetchPreviewItems(previous.debouncedInput),
          false
        )
      }

      props.inputRef.current.addEventListener(
        'focus',
        () => fetchPreviewItems(props.debouncedInput),
        false
      )
    }

    return () => {
      if (props.inputRef.current) {
        props.inputRef.current.removeEventListener(
          'focus',
          () => fetchPreviewItems(props.debouncedInput),
          false
        )
      }
    }
  }, [props.debouncedInput, , fetchPreviewItems])

  useEffect(() => {
    fetchPreviewItems(props.debouncedInput)
  }, [props.debouncedInput])

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
                    type: 'all',
                  })}
                >
                  <Flex p={8} justify="center">
                    <Span
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      <Span>Showing only my entries. </Span>
                      <MyNextLink
                        href={urls.pages.search({
                          q: props.input,
                          type: 'all',
                        })}
                      >
                        <Span color="primary" underline>
                          See all results
                        </Span>
                      </MyNextLink>
                    </Span>
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

export default AllMyItemsPreviewSection
