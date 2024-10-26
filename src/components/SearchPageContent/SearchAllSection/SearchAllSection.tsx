import { validSyncroItemTypes } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import SearchAllSectionTypeItemV2 from './SearchAllSectionTypeItemV2/SearchAllSectionTypeItemV2'
import SearchAllUsersSection from './SearchAllUsersSection/SearchAllUsersSection'

type Props = {
  q: string
}

const SearchAllSection = (props: Props) => {
  return (
    <FlexCol gap={24}>
      {validSyncroItemTypes.map((type) => (
        <SearchAllSectionTypeItemV2 key={type} type={type} q={props.q} />
      ))}

      <SearchAllUsersSection query={props.q} />
    </FlexCol>
  )
}

export default SearchAllSection
