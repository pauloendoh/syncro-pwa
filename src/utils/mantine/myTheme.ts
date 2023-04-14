import { MantineThemeOverride } from '@mantine/core'

export const myTheme: MantineThemeOverride = {
  primaryColor: 'primary',
  fontFamily: 'Noto Sans',

  fontSizes: {
    xs: '11px',
    sm: '13px',
    md: '15px',
    lg: '17px',
    xl: '21px',
  },
  colors: {
    primary: [
      '#F5F9F7',
      '#E8F4F1',
      '#D6ECE7',
      '#BFE4D9',
      '#A5D9C7',
      '#87CCB2',
      '#65BC9A',
      '#65BC9A',
      '#3DAC8D',
      '#3DAC8D',
    ],

    secondary: [
      '#E1DEF6',
      '#D8CDF1',
      '#D2BDEC',
      '#CEADE7',
      '#CE9EE1',
      '#D08EDB',
      '#D57FD5',
      '#CF71C2',
      '#C862AC',
      '#C862AC',
    ],
    dark: [
      'white',
      '#e9e9e9',
      '#afafaf',
      '#6F6F6F',
      '#4D4D4D',
      '#2B2B2B',
      '#262626',
      '#202020',
      '#161616',
      '#1B1B1B',
    ],
  },
  components: {
    Tooltip: {
      defaultProps: {
        openDelay: 500,
      },
    },
  },
}
