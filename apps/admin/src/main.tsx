import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './app/app'
import { GlobalStyle } from './app/theme/global-style'
import { ResetCss } from './app/theme/reset-style'
import { theme } from './app/theme/theme'

/* eslint-disable functional/no-expression-statement */

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ResetCss />
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
