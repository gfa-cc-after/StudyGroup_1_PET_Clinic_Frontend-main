import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { it, expect, describe, vi} from 'vitest'
import LoginForm from '../src/components/LoginForm'
import axios from 'axios'
import { BrowserRouter as Router} from 'react-router-dom'


vi.mock('axios')

describe('LoginForm rediretion tests', () => {
    it('should redirect to the user/admin home based on the token payload', async () => {
        const mockPayload = {
            name: 'John Doe the User',
            role: 'user',
        }
        const mockToken = `header.${btoa(JSON.stringify(mockPayload))}.signature`

        localStorage.setItem('token', mockToken)
        axios.post.mockResolvedValue({
            data: {
                token: mockToken,
                refreshToken: 'mocked.refresh.token',
            }
        })

        render(<Router><LoginForm /></Router>)
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'user@email.com' } })
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } })
        const button = screen.getByRole('button', { name: 'Login' })
        fireEvent.click(button)

        const path = '/'+mockPayload.role+'/home'

        console.log("this is where I am standing: "+window.location.href)

        localStorage.clear()
    })

 })
