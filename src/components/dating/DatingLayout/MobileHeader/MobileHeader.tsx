import { ActionIcon, Text } from '@mantine/core'
import { RxArrowLeft } from 'react-icons/rx'
import { useMyColors } from '../../../../hooks/useMyColors'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useAsPathStore } from '../../../../hooks/zustand/router/useAsPathStore'
import { zIndexes } from '../../../../utils/zIndexes'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../_common/overrides/MyNextLink'

type Props = {
  title: React.ReactNode
  rightTitle?: React.ReactNode

  /**
   * @default true
   * */
  fixedHeader?: boolean
}

const MobileHeader = ({ ...props }: Props) => {
  const { mobileHeaderBg } = useMyColors()

  const { prevAsPath } = useAsPathStore()

  const { isMobile } = useMyMediaQuery()

  return (
    <div
      className="MobileHeader"
      style={{
        height: 64,
      }}
    >
      <FlexVCenter
        sx={{
          position: props.fixedHeader === false ? 'absolute' : 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: mobileHeaderBg,

          padding: 16,
          zIndex: isMobile ? zIndexes.mobileHeader : undefined,
        }}
      >
        <FlexVCenter justify={'space-between'} w="100%">
          <FlexVCenter gap={8}>
            <MyNextLink href={prevAsPath ?? '/'}>
              <ActionIcon>
                <RxArrowLeft fontSize={24} />
              </ActionIcon>
            </MyNextLink>
            <Text
              sx={{
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {props.title}
            </Text>
          </FlexVCenter>

          {props.rightTitle}
        </FlexVCenter>
      </FlexVCenter>
    </div>
  )
}

export default MobileHeader
