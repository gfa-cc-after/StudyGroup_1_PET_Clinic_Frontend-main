import React from 'react'
import LoginForm from '../src/components/LoginForm'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

vi.mock('axios')

describe('LoginForm', () => {
    it('should render the form', async () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )

        const heading = screen.getByRole('heading', {level: 1, name: 'Login'})
        expect(heading).toBeInTheDocument()

        const emailInput = screen.getByLabelText('Email:')
        expect(emailInput).toBeInTheDocument()
        expect(emailInput).toHaveAttribute('type', 'email')
        expect(emailInput).toBeRequired()

        const passwordInput = screen.getByLabelText('Password:')
        expect(passwordInput).toBeInTheDocument()
        expect(passwordInput).toHaveAttribute('type', 'password')
        expect(passwordInput).toBeRequired()

        const loginButton = ( await screen.findAllByRole('button')).filter(button => button.textContent === 'Login')[0]
        expect(loginButton).toBeInTheDocument()
        expect(loginButton).toHaveAttribute('type', 'submit')
    })


    it('should send post request to backend on login click with the proper data', async () => {
        const mockPost = vi.fn().mockResolvedValue({ data: {
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyMjkwMDcyOCwiZXhwIjoxNzIyOTAyNTI4fQ.9Fzi6MCTRjyIZ2dSRDVYCWxNZtQbF87THAWJFQ5AT8o",
            "role": "USER"
        }})
        axios.post = mockPost

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )

        const emailInput = screen.getByLabelText('Email:')
        const passwordInput = screen.getByLabelText('Password:')
        const loginButton =  ( await screen.findAllByRole('button')).filter(button => button.textContent === 'Login')[0]


        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })

        fireEvent.click(loginButton);

        expect(mockPost).toHaveBeenCalledWith(
            expect.stringContaining('/login'),
            {
                email: 'test@example.com',
                password: 'password123'
            },
            { headers: { "Content-Type": "application/json" } }
        )
    })
})