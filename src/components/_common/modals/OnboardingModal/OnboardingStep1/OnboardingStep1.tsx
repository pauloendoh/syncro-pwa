import { Button, Flex, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { syncroItemOptions } from '../../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { SyncroItemType } from '../../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../../flex/FlexCol'
import Span from '../../../text/Span'

type Props = {
  onSelectType: (type: SyncroItemType) => void
}

const OnboardingStep1 = (props: Props) => {
  const [selectedType, setSelectedType] = useState<SyncroItemType>()
  const theme = useMantineTheme()

  const width = 124
  return (
    <FlexCol gap={16}>
      <Flex wrap="wrap" gap={16}>
        {syncroItemOptions.map((o) => (
          <div
            key={o.itemType}
            style={{
              position: 'relative',
              borderRadius: 8,

              border:
                selectedType === o.itemType
                  ? `4px solid ${theme.colors.primary[9]}`
                  : '4px solid transparent',
            }}
          >
            <img
              src={o.onboardingImageUrl}
              style={{
                width: width,
                height: width,
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: 8,
              }}
              onClick={() => {
                if (selectedType === o.itemType) {
                  setSelectedType(undefined)
                  return
                }
                setSelectedType(o.itemType)
              }}
            />
            <Span
              pos="absolute"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: width,
                textAlign: 'center',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0))',
              }}
            >
              {o.getTypeLabel(true)}
            </Span>
          </div>
        ))}
      </Flex>

      <Button
        disabled={!selectedType}
        onClick={() => props.onSelectType(selectedType!)}
      >
        Next
      </Button>
    </FlexCol>
  )
}

export default OnboardingStep1
