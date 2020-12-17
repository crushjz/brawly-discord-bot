import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app/app'
import { GlobalStyle } from './app/theme/global-style'
import { ResetCss } from './app/theme/reset-style'
import { brawlyTheme } from './app/theme/theme'

/* eslint-disable functional/no-expression-statement */

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={brawlyTheme}>
        <ResetCss />
        <GlobalStyle />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
