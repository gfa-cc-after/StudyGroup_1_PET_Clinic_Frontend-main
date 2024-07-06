import React from 'react'
import RegistrationForm from '../src/components/RegistrationForm'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './mockhandlers'

export const server = setupServer(...handlers)

//beforeAll(() => server.listen())
//afterEach(() => server.resetHandlers())
//afterAll(() => server.close())

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
        server.listen()
        render(<RegistrationForm />)

        const emailInput = screen.getByLabelText('Email:')
        fireEvent.change(emailInput, { target: { value: 'test@email.com'}})

        const usernameInput = screen.getByLabelText('Username:')
        fireEvent.change(usernameInput, { target: { value: 'testuser'}})

        const passwordInput = screen.getByLabelText('Password:')
        fireEvent.change(passwordInput, { target: { value: 'password'}})

        const registerButton = screen.getAllByRole('button', { name: 'Register' , type: 'submit'})
        fireEvent.click(registerButton[0])

        await waitFor(() => {
            const successMessage = screen.getByText('User registered successfully')
            console.log(successMessage)
        })
        server.close()
    })
})
