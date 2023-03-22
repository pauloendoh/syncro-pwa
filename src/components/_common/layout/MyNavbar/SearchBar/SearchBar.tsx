import { Select } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useMyRouterQuery } from '../../../../../hooks/useMyRouterQuery'
import useSearchStore from '../../../../../hooks/zustand/useSearchStore'
import { urls } from '../../../../../utils/urls'
import { searchTabOptions } from '../../../../SearchPageContent/searchTabOptions/searchTabOptions'
import MyTextInput from '../../../inputs/MyTextInput'

type Props = {
  autofocus?: boolean
}

const SearchBar = (props: Props) => {
  const { q, type } = useMyRouterQuery()
  const [input, setInput] = useState('')

  useEffect(() => {
    if (q) setInput(q)
  }, [q])
  const router = useRouter()

  const { selectedType, setSelectedType } = useSearchStore()
  useEffect(() => {
    if (router.isReady && type) setSelectedType(type)
  }, [router.isReady])

  // PE 1/3 - ?
  const handleSubmit = () => {
    let type = selectedType
    let q = input
    if (input.includes('#movie')) {
      type = 'movie'
      setSelectedType('movie')
      q = input.split('#movie')[0]
    }
    if (input.includes('#tv')) {
      type = 'tvSeries'
      setSelectedType('tvSeries')
      q = input.split('#tv')[0]
    }
    if (input.includes('#game')) {
      type = 'game'
      setSelectedType('game')
      q = input.split('#game')[0]
    }
    if (input.includes('#manga')) {
      type = 'manga'
      setSelectedType('manga')
      q = input.split('#manga')[0]
    }
    if (input.includes('#book')) {
      type = 'book'
      setSelectedType('book')
      q = input.split('#book')[0]
    }

    setInput(q)

    router.push(
      urls.pages.search({
        q,
        type,
      })
    )
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (input.length > 0) handleSubmit()
  }, [selectedType])

  return (
    <form
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
        rightSection={<MdSearch />}
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
      />

      <button
        style={{
          display: 'none',
        }}
      />
    </form>
  )
}

export default SearchBar
