import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { GlobalStyle } from './app/theme/global-style'
import { ResetCss } from './app/theme/reset-style'
import { brawlyTheme } from './app/theme/theme'
import { environment } from './environments/environment'

const apolloClient = new ApolloClient({
  uri: environment.apiUrl,
  cache: new InMemoryCache(),
})

/* eslint-disable functional/no-expression-statement */

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={brawlyTheme}>
        <ResetCss />
        <GlobalStyle />
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
