import React from 'react'
import { Route } from 'react-router-dom'
import styled from '@emotion/styled'
import Home from './pages/Home'

const StyledApp = styled.div``

export const App = () => {
  return (
    <StyledApp>
      <Route path="/" exact render={() => <Home />} />

      <Route
        path="/dashboard"
        exact
        render={() => <div> This is /dashboard</div>}
      />
    </StyledApp>
  )
}

export default App
