import { RegistrationForm } from '../../src/components/RegistrationForm'
import { render, fireEvent } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

vi.mock('axios')

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  )
}

describe('RegistrationForm', () => {
  it('should render the form', async () => {
    const { getByLabelText, getByText, findAllByRole } = renderWithRouter(<RegistrationForm />)

    const heading = getByText('Registration Form')
    expect(heading).toBeInTheDocument()

    const emailInput = getByLabelText('Email:')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toBeRequired()

    const usernameInput = getByLabelText('Username:')
    expect(usernameInput).toBeInTheDocument()
    expect(usernameInput).toHaveAttribute('type', 'text')
    expect(usernameInput).toBeRequired()

    const passwordInput = getByLabelText('Password:')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toBeRequired()

    const registerButton = (await findAllByRole('button')).filter(button => button.textContent === 'Register')[0]
    expect(registerButton).toBeInTheDocument()
    expect(registerButton).toHaveAttribute('type', 'submit')
  })


  it('should send post request to backend on registration click with the proper data', async () => {
    const mockPost = vi.fn().mockResolvedValue({ data: 'Registration successful' })
    axios.post = mockPost

    const { getByLabelText, findAllByRole } = renderWithRouter(<RegistrationForm />)

    const emailInput = getByLabelText('Email:')
    const usernameInput = getByLabelText('Username:')
    const passwordInput = getByLabelText('Password:')
    const registerButton = (await findAllByRole('button')).filter(button => button.textContent === 'Register')[0]


    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    fireEvent.click(registerButton);

    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining('/register'),
      {
        email: 'test@example.com',
        displayName: 'testuser',
        password: 'password123'
      },
      { headers: { "Content-Type": "application/json" } }
    )
  })
})