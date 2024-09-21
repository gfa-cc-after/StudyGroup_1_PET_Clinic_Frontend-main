import React from 'react'
import ProfilePage from '../../src/components/ProfilePage'
import { useAuth } from '../../src/hooks/store'
import { render, fireEvent, renderHook, act } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

vi.mock('axios')

const renderWithRouter = (ui) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    )
}

describe('ProfilePage', () => {
    it('should render the form', async () => {
        const { getByLabelText, findAllByRole, getByRole } = renderWithRouter(<ProfilePage />)

        const heading = getByRole('heading', {level: 1, name: 'Profile Settings'})
        expect(heading).toBeInTheDocument()

        const emailInput = getByLabelText('Change Email:')
        expect(emailInput).toBeInTheDocument()
        expect(emailInput).toHaveAttribute('type', 'email')
        expect(emailInput).toBeRequired()

        const displayNameInput = getByLabelText('Change Username:')
        expect(displayNameInput).toBeInTheDocument()
        expect(displayNameInput).toHaveAttribute('type', 'text')
        expect(displayNameInput).toBeRequired()

        const originalPasswordInput = getByLabelText('Original Password:')
        expect(originalPasswordInput).toBeInTheDocument()
        expect(originalPasswordInput).toHaveAttribute('type', 'password')
        expect(originalPasswordInput).toBeRequired()

        const newPasswordInput = getByLabelText('New Password:')
        expect(newPasswordInput).toBeInTheDocument()
        expect(newPasswordInput).toHaveAttribute('type', 'password')

        const newPasswordAgainInput = getByLabelText('New Password Again:')
        expect(newPasswordAgainInput).toBeInTheDocument()
        expect(newPasswordAgainInput).toHaveAttribute('type', 'password')

        const changeButton = ( await findAllByRole('button')).filter(button => button.textContent === 'Change')[0]
        expect(changeButton).toBeInTheDocument()
        expect(changeButton).toHaveAttribute('type', 'submit')
    })

    it('should send post request to backend on change click with the proper data', async () => {
      const mockPost = vi.fn().mockResolvedValue({
        data: {
          "token": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyMjkwMDcyOCwiZXhwIjoxNzIyOTAyNTI4fQ.9Fzi6MCTRjyIZ2dSRDVYCWxNZtQbF87THAWJFQ5AT8o",
          "role": "USER"
        }
      })
      axios.post = mockPost
     
    // Mock implementation of useAuth hook
    const renderedHook = renderHook(() => useAuth())

    act(() => {
      renderedHook.result.current.setUser('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyMjkwMDcyOCwiZXhwIjoxNzIyOTAyNTI4fQ.9Fzi6MCTRjyIZ2dSRDVYCWxNZtQbF87THAWJFQ5AT8o')
  })

        const { getByLabelText, findAllByRole } = renderWithRouter(<ProfilePage />)

        const emailInput = getByLabelText('Change Email:')
        const usernameInput = getByLabelText('Change Username:')
        const originalPasswordInput = getByLabelText('Original Password:')
        const newPasswordInput = getByLabelText('New Password:')
        const newPasswordAgainInput = getByLabelText('New Password Again:')
        const changeButton =  ( await findAllByRole('button')).filter(button => button.textContent === 'Change')[0]


        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })
        fireEvent.change(originalPasswordInput, { target: { value: 'password123' } })
        fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } })
        fireEvent.change(newPasswordAgainInput, { target: { value: 'newPassword123' } })


        fireEvent.click(changeButton);

        expect(mockPost).toHaveBeenCalledWith(
            expect.stringContaining('/profile'),
            {
                "email": "test@example.com",
                "displayName": "testuser",
                "originalPassword": "password123",
                "password": "newPassword123"
            },
            { headers: { 
              "Content-Type": "application/json",
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyMjkwMDcyOCwiZXhwIjoxNzIyOTAyNTI4fQ.9Fzi6MCTRjyIZ2dSRDVYCWxNZtQbF87THAWJFQ5AT8o"
             } }
        )
    })
})

