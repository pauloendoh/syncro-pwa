import React, { forwardRef } from 'react'
import { IconBaseProps } from 'react-icons'
import FlexVCenter from '../../../../flex/FlexVCenter'
import Span from '../../../../text/Span'

type Props = {
  label: string
  Icon: React.ComponentType<IconBaseProps>
}

const SearchBarSelectItem = forwardRef<HTMLDivElement, Props>(
  ({ Icon, label, ...others }: Props, ref) => (
    <div ref={ref} {...others}>
      <FlexVCenter gap={4}>
        <Icon size={16} />
        <Span>{label}</Span>
      </FlexVCenter>
    </div>
  )
)

export default SearchBarSelectItem
