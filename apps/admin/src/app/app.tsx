import React from 'react'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'

const StyledApp = styled.div``

export const App = () => {
  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to admin!</h1>
      </header>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route. <Link to="/login">Login</Link>
          </div>
        )}
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
