/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable functional/prefer-type-literal */

// Source: https://github.com/styled-components/styled-components/issues/1589

import { theme } from './theme'

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
