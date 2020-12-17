import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

/* eslint-disable functional/no-expression-statement */

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(baseElement).toBeTruthy()
  })
})
