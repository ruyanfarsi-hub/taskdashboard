// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import { AppProvider } from '../context/AppContext'
import Tasks from './Tasks'

describe('Tasks page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('displays the initial tasks', () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <Tasks />
        </MemoryRouter>
      </AppProvider>
    )

    expect(screen.getByText('Learn English')).toBeInTheDocument()
    expect(screen.getByText('Learn Spanish')).toBeInTheDocument()
    expect(screen.getByText('Learn French')).toBeInTheDocument()
  })

  it('adds a new task', async () => {
    const user = userEvent.setup()

    render(
      <AppProvider>
        <MemoryRouter>
          <Tasks />
        </MemoryRouter>
      </AppProvider>
    )

    const input = screen.getByRole('textbox', { name: 'Task title' })
    const button = screen.getByRole('button', { name: 'Add Task' })

    await user.type(input, 'Learn React')
    await user.click(button)

    expect(await screen.findByText('Learn React')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('marks a task as completed', async () => {
    const user = userEvent.setup()

    render(
      <AppProvider>
        <MemoryRouter>
          <Tasks />
        </MemoryRouter>
      </AppProvider>
    )

    const completeButton = screen.getAllByRole('button', {
      name: 'Complete',
    })[0]

    await user.click(completeButton)

    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
  })

  it('deletes a task', async () => {
    const user = userEvent.setup()

    render(
      <AppProvider>
        <MemoryRouter>
          <Tasks />
        </MemoryRouter>
      </AppProvider>
    )

    const deleteButtons = screen.getAllByRole('button', {
      name: 'Delete',
    })

    await user.click(deleteButtons[0])

    expect(screen.queryByText('Learn English')).not.toBeInTheDocument()
  })
})
 