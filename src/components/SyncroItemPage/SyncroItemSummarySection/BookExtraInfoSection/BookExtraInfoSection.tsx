import { BookExtraInfoDto } from '../../../../types/domain/syncro-item/BookExtraInfoDto/BookExtraInfoDto'
import Span from '../../../_common/text/Span'

type Props = {
  info: BookExtraInfoDto
}

const BookExtraInfoSection = ({ ...props }: Props) => {
  return (
    <div className="BookExtraInfoSection">
      {!!props.info.pagesQty && <Span>Pages: {props.info.pagesQty}</Span>}
    </div>
  )
}

export default BookExtraInfoSection
