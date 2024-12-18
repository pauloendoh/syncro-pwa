import { ActionIcon, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { RxArrowLeft } from 'react-icons/rx'
import { useMyColors } from '../../../../hooks/useMyColors'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { zIndexes } from '../../../../utils/zIndexes'
import FlexVCenter from '../../../_common/flex/FlexVCenter'

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

  const router = useRouter()

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
            <ActionIcon
              onClick={() => {
                router.back()
              }}
            >
              <RxArrowLeft fontSize={24} />
            </ActionIcon>
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
