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
import { SearchType } from '../../../../../types/domain/search/SearchParams'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../../utils/urls'
import { useAxios } from '../../../../../utils/useAxios'
import { searchTabOptions } from '../../../../SearchPageContent/searchTabOptions/searchTabOptions'
import FlexCol from '../../../flex/FlexCol'
import SyncroItemImage from '../../../image/SyncroItemImage/SyncroItemImage'
import MyTextInput from '../../../inputs/MyTextInput'
import MyNextLink from '../../../overrides/MyNextLink'
import { useSubmitSearchBar } from './useSubmitSearchBar/useSubmitSearchBar'

type Props = {
  autofocus?: boolean
}

const SearchBar = (props: Props) => {
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

  const [previewedItems, setPreviewedItems] = useState<SyncroItemDto[]>([])

  const { ref, width } = useElementSize()

  const axios = useAxios()

  const handlePreviewItems = useCallback(
    (input: string, selectedType: SearchType) => {
      if (q === debouncedInput && type === selectedType) {
        setPreviewedItems([])
        return
      }
      if (input.length > 0) {
        axios
          .get<SyncroItemDto[]>(
            urls.api.searchAutocomplete({
              q: debouncedInput,
              type: selectedType,
            })
          )
          .then((res) => {
            setPreviewedItems(res.data)
          })
        return
      }

      setPreviewedItems([])
    },
    [debouncedInput, selectedType]
  )

  useEffect(() => {
    handlePreviewItems(debouncedInput, selectedType)
  }, [debouncedInput, selectedType])

  const clickOutsideRef = useClickOutside(() => setPreviewedItems([]))

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
        }))}
        onKeyDown={(e) => {
          console.log('xd')
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
        styles={(theme) => ({
          input: {
            borderRadius: '4px 0 0 4px',
            ':focus': {
              borderRight: `2px solid ${theme.colors.primary[9]}`,
            },
          },
        })}
        value={selectedType}
        onChange={(value) => {
          setSelectedType(value as any)
        }}
      />
      <MyTextInput
        rightSection={
          <MdSearch
            onClick={() => {
              handleSubmit()
              inputRef.current?.blur()
            }}
          />
        }
        placeholder={'Search Syncro'}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        autoFocus={props.autofocus}
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

      {previewedItems.length > 0 && (
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
          {previewedItems.map((item) => (
            <MyNextLink key={item.id} href={urls.pages.syncroItem(item.id)}>
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
                </FlexCol>
              </Flex>
            </MyNextLink>
          ))}
        </Paper>
      )}
    </form>
  )
}

export default SearchBar
