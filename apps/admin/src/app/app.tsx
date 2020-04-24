import React from 'react'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'
// import { Button } from 'rebass/styled-components'

const StyledApp = styled.div``

export const App = () => {
  return (
    <StyledApp>
      <Link to="/">Home</Link>

      <Link to="/login">Add to Discord</Link>
      {/* <Button variant="primary" as={Link} to="/login">
        Add to Discord
      </Button> */}

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
