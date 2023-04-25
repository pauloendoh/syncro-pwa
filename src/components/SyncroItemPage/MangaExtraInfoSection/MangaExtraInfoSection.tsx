import { Text } from '@mantine/core'
import { MangaExtraInfoDto } from '../../../types/domain/syncro-item/MangaExtraInfoDto/MangaExtraInfoDto'
import FlexCol from '../../_common/flex/FlexCol'

type Props = {
  info: MangaExtraInfoDto
}

const MangaExtraInfoSection = (props: Props) => {
  return (
    <FlexCol>
      {props.info.chaptersQty > 0 ? (
        <Text>Chapters: {props.info.chaptersQty}</Text>
      ) : (
        <Text>Chapters: Unknown</Text>
      )}
      {props.info.status.length > 0 && <Text>Status: {props.info.status}</Text>}
    </FlexCol>
  )
}

export default MangaExtraInfoSection
