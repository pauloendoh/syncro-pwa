import { useRouter } from 'next/router'
import { SetStateAction } from 'react'
import useSearchStore from '../../../../../../hooks/zustand/useSearchStore'
import { urls } from '../../../../../../utils/urls'

export const useSubmitSearchBar = (params: {
  input: string
  setInput: (value: SetStateAction<string>) => void
}) => {
  const { input, setInput } = params

  const { selectedType, setSelectedType } = useSearchStore()

  const router = useRouter()

  const submit = () => {
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

  return submit
}
