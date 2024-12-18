import { useMySharedListsQuery } from '../../../hooks/react-query/shared-list/useMySharedListsQuery'
import { SharedListLinkButton } from '../../_common/modals/UserSharedListsWithYouModal/SharedListLinkButton/SharedListLinkButton'

type Props = {}

export const MySharedListsSection = ({ ...props }: Props) => {
  const { data } = useMySharedListsQuery()
  return (
    <div className="MySharedListsSection">
      {data?.length === 0 && (
        <div>You're not included in any shared list yet</div>
      )}
      {data?.map((item) => (
        <SharedListLinkButton item={item} key={item.id} />
      ))}
    </div>
  )
}
