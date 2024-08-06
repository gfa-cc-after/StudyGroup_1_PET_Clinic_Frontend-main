import React from 'react'
import RegistrationForm from '../src/components/RegistrationForm'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')


describe('RegistrationForm', () => {
    it('should render the form', async () => {
        render(<RegistrationForm />)

        const heading = screen.getByText('Registration Form')
        expect(heading).toBeInTheDocument()

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

        const registerButton = ( await screen.findAllByRole('button')).filter(button => button.textContent === 'Register')[0]
        expect(registerButton).toBeInTheDocument()
        expect(registerButton).toHaveAttribute('type', 'submit')
    })


    it('should send post request to backend on registration click with the proper data', async () => {
        const mockPost = vi.fn().mockResolvedValue({ data: 'Registration successful' })
        axios.post = mockPost

        render(<RegistrationForm />);

        const emailInput = screen.getByLabelText('Email:')
        const usernameInput = screen.getByLabelText('Username:')
        const passwordInput = screen.getByLabelText('Password:')
        const registerButton =  ( await screen.findAllByRole('button')).filter(button => button.textContent === 'Register')[0]


        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })

        fireEvent.click(registerButton);

        expect(mockPost).toHaveBeenCalledWith(
            expect.stringContaining('/register'),
            {
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123'
            },
            { headers: { "Content-Type": "application/json" } }
        )
    })
})