import { Flex } from '@mantine/core'
import { GameExtraInfoDto } from '../../../../types/domain/syncro-item/GameExtraInfoDto/GameExtraInfoDto'
import Span from '../../../_common/text/Span'

type Props = {
  info: GameExtraInfoDto
}

const GameExtraInfoSection = (props: Props) => {
  const platformsLabel = props.info.platforms.join(', ')

  if (!props.info.platforms.length) return null

  return (
    <Flex>
      <Span>Platforms: {platformsLabel}</Span>
    </Flex>
  )
}

export default GameExtraInfoSection
