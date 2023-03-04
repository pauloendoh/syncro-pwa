import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../../../hooks/useMyRouterQuery'
import { urls } from '../../../../../utils/urls'
import MyTextInput from '../../../inputs/MyTextInput'

type Props = {}

const SearchBar = (props: Props) => {
  const { q } = useMyRouterQuery()
  const [input, setInput] = useState('')
  useEffect(() => {
    if (q) setInput(q)
  }, [q])
  const router = useRouter()

  const { type } = useMyRouterQuery()

  const { isSmallScreen } = useMyMediaQuery()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        router.push(
          urls.pages.search({
            q: input,
            type: type || 'movie',
          })
        )
      }}
    >
      <MyTextInput
        placeholder={
          isSmallScreen
            ? 'Search...'
            : 'Search your favorite movies, TV shows, games...'
        }
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        icon={<MdSearch />}
        sx={{
          width: 'clamp(160px, 40vw , 540px)',
        }}
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
