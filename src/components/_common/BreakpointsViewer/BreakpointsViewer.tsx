import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'

type Props = {
  disabled: boolean
}

const BreakpointsViewer = ({ ...props }: Props) => {
  const { screenWidth } = useMyMediaQuery()
  const theme = useMantineTheme()

  const isXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`)
  const isXsSm = useMediaQuery(
    `(min-width: ${theme.breakpoints.xs}) and (max-width: ${theme.breakpoints.sm})`
  )
  const isSmMd = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.md})`
  )

  const isMdLg = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.lg})`
  )
  const isLgXl = useMediaQuery(
    `(min-width: ${theme.breakpoints.lg}) and (max-width: ${theme.breakpoints.xl})`
  )

  const ixXl = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`)

  if (props.disabled) return null

  return (
    <div
      className="BreakpointsViewer"
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        padding: 8,
        backgroundColor: 'black',
        opacity: 0.5,
      }}
    >
      <div>BreakpointsViewer {screenWidth}px</div>
      <div>{isXs && 'XS'}</div>
      <div>{isXsSm && 'XS~SM'}</div>
      <div>{isSmMd && 'SM~MD'}</div>
      <div>{isMdLg && 'MD~LG'}</div>
      <div>{isLgXl && 'LG~XL'}</div>
      <div>{ixXl && 'XL'}</div>
    </div>
  )
}

export default BreakpointsViewer
