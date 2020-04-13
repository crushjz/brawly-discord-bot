import React from 'react'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'rebass/styled-components'

const StyledApp = styled.div``

export const App = () => {
  return (
    <StyledApp>
      <Link to="/">Home</Link>
      <Button variant="primary" as={Link} to="/login">
        Add to Discord
      </Button>
    </StyledApp>
  )
}

export default App
