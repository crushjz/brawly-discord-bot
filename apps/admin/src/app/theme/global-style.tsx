import React from 'react'
import { css, Global, useTheme } from '@emotion/react'
import { BrawlyTheme } from './theme'

export const GlobalStyle = () => {
  const theme = useTheme() as BrawlyTheme

  const globalCss = css`
    @font-face {
      font-family: Whitney;
      src: url('./assets/fonts/whitney.woff') format('woff');
      font-weight: 300;
    }

    body {
      text-rendering: optimizeLegibility;
      font-family: ${theme.fonts.body} !important;
    }
  `

  return <Global styles={globalCss} />
}
