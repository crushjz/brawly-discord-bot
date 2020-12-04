import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import styled from '@emotion/styled'

const StyledApp = styled.div``

export const App = () => {
  return (
    <StyledApp>
      <Link to="/">Home</Link>

      <Button as={Link} to="/login">
        Add to Discord
      </Button>

      <Route
        path="/"
        exact
        render={() => <div>This is the generated root route.</div>}
      />

      <Route
        path="/login"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
    </StyledApp>
  )
}

export default App
