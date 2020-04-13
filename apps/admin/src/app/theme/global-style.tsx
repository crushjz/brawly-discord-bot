// import { createGlobalStyle } from './themed-styled-component'

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Whitney;
    src: url("./assets/fonts/whitney.woff") format("woff");
    font-weight: 300;
  }


  body {
    text-rendering: optimizeLegibility;
    font-family: ${props => props.theme.fonts.body}
  }
`
