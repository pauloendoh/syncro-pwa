import { Select } from '@mantine/core'
import { useDebouncedValue, useElementSize } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../../../hooks/useMyRouterQuery'
import useSearchStore from '../../../../../hooks/zustand/useSearchStore'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import { isSyncroItemType } from '../../../../SearchPageContent/isSyncroItemType/isSyncroItemType'
import { searchTabOptions } from '../../../../SearchPageContent/searchTabOptions/searchTabOptions'
import MyTextInput from '../../../inputs/MyTextInput'
import AllMyItemsPreviewSection from './AllMyItemsPreviewSection/AllMyItemsPreviewSection'
import SearchBarSelectItem from './SearchBarSelectItem/SearchBarSelectItem'
import SpecificTypePreviewSection from './SpecificTypePreviewSection/SpecificTypePreviewSection'
import { useSubmitSearchBar } from './useSubmitSearchBar/useSubmitSearchBar'

type SearchPreviewDto = {
  item: SyncroItemDto
}

const SearchBar = () => {
  const { q, type } = useMyRouterQuery()
  const [input, setInput] = useState('')

  const { isMobile } = useMyMediaQuery()
  useEffect(() => {
    if (q) setInput(q)
  }, [q])
  const router = useRouter()

  const { selectedType, setSelectedType } = useSearchStore()

  useEffect(() => {
    if (router.isReady && type) {
      setSelectedType(type)
    }
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

  const { ref, width } = useElementSize()

  // PE 2/3 - rename to SelectedItemTypeIcon, and maybe use SyncroItemIcon component?
  const SelectedIcon = useMemo(() => {
    const Icon = searchTabOptions.find(
      (option) => option.key === selectedType
    )?.Icon
    if (!Icon) return null

    return <Icon />
  }, [selectedType])

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
        w={140}
        sx={{
          position: 'relative',
          left: 0,
        }}
        maxDropdownHeight={340}
        styles={(theme) => ({
          input: {
            borderRadius: '4px 0 0 4px',
            ':focus': {
              borderRight: `2px solid ${theme.colors.primary[9]}`,
            },
          },
          dropdown: {
            minWidth: 168,
            marginLeft: 14,
          },
        })}
        value={selectedType}
        onChange={(value) => {
          setSelectedType(value as any)
        }}
        itemComponent={SearchBarSelectItem}
        icon={SelectedIcon}
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
      />

      <button
        style={{
          display: 'none',
        }}
      />

      {isSyncroItemType(selectedType) && (
        <SpecificTypePreviewSection
          input={input}
          inputRef={inputRef}
          selectedType={selectedType}
          width={width}
          debouncedInput={debouncedInput}
          queryParamQ={q}
          queryParamType={type}
        />
      )}
      {selectedType === 'all' && (
        <AllMyItemsPreviewSection
          input={input}
          inputRef={inputRef}
          width={width}
          debouncedInput={debouncedInput}
          queryParamQ={q}
          queryParamType={type}
        />
      )}
    </form>
  )
}

export default SearchBar
