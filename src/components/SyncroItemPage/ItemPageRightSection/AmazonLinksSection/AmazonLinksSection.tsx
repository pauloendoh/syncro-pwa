import { useAmazonLinksQuery } from '../../../../hooks/react-query/syncro-item/book/useMyFeedbackQuery'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'

type Props = {
  item: SyncroItemDto
}

const AmazonLinksSection = ({ ...props }: Props) => {
  const { data } = useAmazonLinksQuery(props.item.id)
  return (
    <div className="AmazonLinksSection">
      <div>AmazonLinksSection</div>
    </div>
  )
}

export default AmazonLinksSection
