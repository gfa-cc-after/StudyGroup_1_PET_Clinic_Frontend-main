import React from 'react'
import LoginForm from '../../src/components/LoginForm'
import { render, fireEvent, waitFor, renderHook, getByTestId } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from '../../src/hooks/store'

vi.mock('axios')

const renderWithRouter = (ui) => {
    return render(
        <BrowserRouter>
            {ui}
        </BrowserRouter>
    )
}

describe('LoginForm', () => {
    it('should render the form', async () => {
        const { getByLabelText, findAllByRole, getByRole } = renderWithRouter(<LoginForm />)

        const heading = getByRole('heading', { level: 1, name: 'Login' })
        expect(heading).toBeInTheDocument()

        const emailInput = getByLabelText('Email:')
        expect(emailInput).toBeInTheDocument()
        expect(emailInput).toHaveAttribute('type', 'email')
        expect(emailInput).toBeRequired()

        const passwordInput = getByLabelText('Password:')
        expect(passwordInput).toBeInTheDocument()
        expect(passwordInput).toHaveAttribute('type', 'password')
        expect(passwordInput).toBeRequired()

        const loginButton = (await findAllByRole('button')).filter(button => button.textContent === 'Login')[0]
        expect(loginButton).toBeInTheDocument()
        expect(loginButton).toHaveAttribute('type', 'submit')
    })


    it('should send post request to backend on login click with the proper data', async () => {
        const mockPost = vi.fn().mockResolvedValue({
            data: {
                "token": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyMjkwMDcyOCwiZXhwIjoxNzIyOTAyNTI4fQ.9Fzi6MCTRjyIZ2dSRDVYCWxNZtQbF87THAWJFQ5AT8o",
                "role": "USER"
            }
        })
        axios.post = mockPost

        const { getByLabelText, findAllByRole } = renderWithRouter(<LoginForm />)

        const emailInput = getByLabelText('Email:')
        const passwordInput = getByLabelText('Password:')
        const loginButton = (await findAllByRole('button')).filter(button => button.textContent === 'Login')[0]

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

    it('should handle network errors gracefully', async () => {
        const mockPost = vi.fn().mockRejectedValue(new Error('Network Error'));
        axios.post = mockPost;

        const { getByLabelText, findAllByRole, getByText } = renderWithRouter(<LoginForm />)

        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Password:');
        const loginButton = (await findAllByRole('button')).filter(button => button.textContent === 'Login')[0];

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(getByText('There was a network error')).toBeInTheDocument();
        });
    });

    it('should handle login failures due to incorrect credentials', async () => {
        const mockPost = vi.fn().mockRejectedValue({ response: { data: 'Bad credentials' } });
        axios.post = mockPost;

        const { getByLabelText, findAllByRole, getByText } = renderWithRouter(<LoginForm />)

        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Password:');
        const loginButton = (await findAllByRole('button')).filter(button => button.textContent === 'Login')[0];

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(getByText('There was an error logging in...Bad credentials')).toBeInTheDocument();
        });
    });

    it('should handle login and update the store with role and token', async () => {
        const mockPost = vi.fn().mockRejectedValue({ token: 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImRpc3BsYXlOYW1lIjoidiIsImlkIjoiNCIsImVtYWlsIjoidm96YXJkQHQtZW1haWwuaHUiLCJzdWIiOiJ2b3phcmRAdC1lbWFpbC5odSIsImlhdCI6MTcyNTMxMDEwOCwiZXhwIjoxNzI1MzExOTA4fQ.Uf-iKyQoQ0vtg74KH-DJnJhOaRK3GacgknJWyh4ltkc' });
        axios.post = mockPost;

        const { getByLabelText, findAllByRole, getByTestId } = renderWithRouter(<LoginForm />)

        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Password:');
        const loginButton = (await findAllByRole('button')).filter(button => button.textContent === 'Login')[0];

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });

        fireEvent.click(loginButton);

        const { result } = renderHook(() => useAuth());
        await waitFor(() => {
            expect(result.current.role).not.toBeNull();
            expect(result.current.role).toBe("ROLE_USER");
            expect(result.current.token).not.toBeNull();
        });

        const locator = getByTestId("user-role");
        expect(locator).toBeInTheDocument();
        expect(locator).toHaveTextContent("ROLE_USER");
    });
})