import Span from '../../_common/text/Span'
import GenreChips from './GenreChips/GenreChips'

type Props = {
  isPreview?: boolean
  genres: string[]
}

const GenresSection = ({ ...props }: Props) => {
  if (props.genres.length === 0) return null

  if (props.isPreview) {
    return (
      <Span size="sm">
        <Span weight={500}>Genres:</Span>{' '}
        {props.genres.map((genre, index) => {
          return (
            <Span key={genre}>
              {genre}
              {index < props.genres.length - 1 ? ', ' : ''}
            </Span>
          )
        })}
      </Span>
    )
  }

  return <GenreChips genres={props.genres} />
}

export default GenresSection
