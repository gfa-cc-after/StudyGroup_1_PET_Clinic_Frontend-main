import React from 'react'
import RegistrationForm from '../src/components/RegistrationForm'
import { render, screen } from '@testing-library/react'
import { it, expect, describe } from 'vitest'


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

    it('should send post request to backend on registration click', async () => {
        render(<RegistrationForm />)
    })
})