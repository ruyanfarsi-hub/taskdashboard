import { render, screen } from '@testing-library/react'
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

function Greeting() {
  return <h1>Hello, Reyhane!</h1>
}

describe('Greeting component', () => {
  it('displays the greeting message', () => {
    render(<Greeting />)
expect(
  screen.getByRole('heading', { name: 'Hello, Reyhane!' })
).toBeTruthy()
  })
})