import React from 'react'
import RegistrationForm from '../src/components/RegistrationForm'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'


describe('RegistrationForm', () => {
    it('should render the form', async () => {
        render(<RegistrationForm />)

        const emailInput = screen.getByLabelText('Email:')
        expect(emailInput).toBeInTheDocument()
        expect(emailInput).toHaveAttribute('type', 'email')
        expect(emailInput).toBeRequired()
        
        const usernameInput = screen.getByLabelText('Username:')
        expect(usernameInput).toBeInTheDocument()
        expect(usernameInput).toHaveAttribute('type', 'text')
        expect(usernameInput).toBeRequired()

        const passwordInput = screen.getByLabelText('Password:')
        expect(passwordInput).toBeInTheDocument()
        expect(passwordInput).toHaveAttribute('type', 'password')
        expect(passwordInput).toBeRequired()

        const registerButton = screen.getByRole('button', { name: /register/i })
        expect(registerButton).toBeInTheDocument()
        expect(registerButton).toHaveAttribute('type', 'submit')
    })

    it('should update the form data when the user types', async () => {
        render(<RegistrationForm />)

        const emailInput = screen.getByLabelText('Email:')
        const usernameInput = screen.getByLabelText('Username:')
        const passwordInput = screen.getByLabelText('Password:')

        fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })
        fireEvent.change(passwordInput, { target: { value: '1234' } })
        //fireEvent.click(screen.getAllByRole("button", { name: /register/i }))

        await waitFor(() => {
           // TBD
        });

    })

})
