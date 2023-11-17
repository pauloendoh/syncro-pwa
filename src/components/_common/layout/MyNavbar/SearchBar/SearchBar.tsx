import { Flex, Paper, Select, Text, useMantineTheme } from '@mantine/core'
import {
  useClickOutside,
  useDebouncedValue,
  useElementSize,
} from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../../../hooks/useMyRouterQuery'
import useSearchStore from '../../../../../hooks/zustand/useSearchStore'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import { SearchType } from '../../../../../types/domain/search/SearchParams'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../../utils/urls/urls'
import { useAxios } from '../../../../../utils/useAxios'
import { isSyncroItemType } from '../../../../SearchPageContent/isSyncroItemType/isSyncroItemType'
import { searchTabOptions } from '../../../../SearchPageContent/searchTabOptions/searchTabOptions'
import SyncroItemLink from '../../../SyncroItemLink/SyncroItemLink'
import FlexCol from '../../../flex/FlexCol'
import SyncroItemImage from '../../../image/SyncroItemImage/SyncroItemImage'
import MyTextInput from '../../../inputs/MyTextInput'
import MyNextLink from '../../../overrides/MyNextLink'
import SearchBarSelectItem from './SearchBarSelectItem/SearchBarSelectItem'
import { useSubmitSearchBar } from './useSubmitSearchBar/useSubmitSearchBar'

type SearchPreviewDto = {
  item: SyncroItemDto
  myRating: RatingDto | null
}

const SearchBar = () => {
  const theme = useMantineTheme()
  const { q, type } = useMyRouterQuery()
  const [input, setInput] = useState('')

  const { isMobile } = useMyMediaQuery()
  useEffect(() => {
    if (q) setInput(q)
  }, [q])
  const router = useRouter()

  const { selectedType, setSelectedType } = useSearchStore()
  useEffect(() => {
    if (router.isReady && type) setSelectedType(type)
  }, [router.isReady])

  const handleSubmit = useSubmitSearchBar({
    input,
    setInput,
  })

  const [debouncedInput] = useDebouncedValue(input, 500)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (input.length > 0 && isMobile) handleSubmit()
  }, [selectedType])

  const [previewData, setPreviewData] = useState<SearchPreviewDto[]>([])
  const { ref, width } = useElementSize()

  const axios = useAxios()

  const handlePreviewItems = useCallback(
    (input: string, selectedType: SearchType) => {
      if (q === debouncedInput && type === selectedType) {
        setPreviewData([])
        return
      }

      if (!isSyncroItemType(selectedType)) {
        setPreviewData([])
        return
      }

      if (input.length > 0) {
        axios
          .get<SearchPreviewDto[]>(
            urls.api.searchAutocomplete({
              q: debouncedInput,
              type: selectedType,
            })
          )
          .then((res) => {
            setPreviewData(res.data)
          })
        return
      }

      setPreviewData([])
    },
    [debouncedInput, selectedType]
  )

  useEffect(() => {
    handlePreviewItems(debouncedInput, selectedType)
  }, [debouncedInput, selectedType])

  const clickOutsideRef = useClickOutside(() => setPreviewData([]))

  return (
    <form
      ref={ref}
      style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
      }}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
        e.currentTarget.blur()
      }}
    >
      <Select
        data={searchTabOptions.map((option) => ({
          label: option.label,
          value: option.key,
          Icon: option.Icon,
        }))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit()
          }
        }}
        w={110}
        sx={{
          position: 'relative',
          left: 0,
        }}
        maxDropdownHeight={300}
        styles={(theme) => ({
          input: {
            borderRadius: '4px 0 0 4px',
            ':focus': {
              borderRight: `2px solid ${theme.colors.primary[9]}`,
            },
          },
          dropdown: {
            minWidth: 168,
            marginLeft: 30,
          },
        })}
        value={selectedType}
        onChange={(value) => {
          setSelectedType(value as any)
        }}
        itemComponent={SearchBarSelectItem}
      />

      <MyTextInput
        rightSection={
          <MdSearch
            onClick={() => {
              handleSubmit()
              inputRef.current?.blur()
            }}
            style={{
              cursor: 'pointer',
            }}
          />
        }
        placeholder={'Search Syncro'}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit()
            e.currentTarget.blur()
          }
        }}
        sx={{
          position: 'relative',
          left: -1,
          flexGrow: 1,
        }}
        styles={{
          input: {
            borderRadius: '0 4px 4px 0',
          },
        }}
        ref={inputRef}
        onFocus={() => {
          handlePreviewItems(input, selectedType)
        }}
      />

      <button
        style={{
          display: 'none',
        }}
      />

      {previewData.length > 0 && (
        <Paper
          ref={clickOutsideRef}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: width,
            zIndex: 100,
            maxHeight: 340,
            overflowY: 'auto',
            backgroundColor: theme.colors.dark[8],
          }}
        >
          <MyNextLink
            href={urls.pages.search({
              q: input,
              type: selectedType,
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
          {previewData.map(({ item, myRating }) => (
            <SyncroItemLink
              key={item.id}
              item={item}
              onClick={() => {
                setPreviewData([])
              }}
              disablePreview
            >
              <Flex
                p={8}
                gap={8}
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: theme.colors.dark[4],
                  },
                }}
              >
                <SyncroItemImage item={item} height={80} width={80} />
                <FlexCol>
                  <Text
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    {item.title}
                  </Text>
                  {item.year ?? <Text>{item.year}</Text>}
                  {myRating && <div>I rated :D</div>}
                </FlexCol>
              </Flex>
            </SyncroItemLink>
          ))}
        </Paper>
      )}
    </form>
  )
}

export default SearchBar
