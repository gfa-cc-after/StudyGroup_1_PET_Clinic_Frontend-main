import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { BrowserRouter as MemoryRouter } from 'react-router-dom'
import UserHome from '../src/components/UserHome'


vi.mock("jwt-decode", async (importOriginal) => {
    const actual = await importOriginal()
    return {
      ...actual,
      default: vi.fn().mockReturnValue({ name: 'testUser', role: 'user' })
    }
  })

/*
describe('UserHome', () => {
    it('renders user home page with username', () => {

        const mockToken = 'header.eyJyb2xlIjoidXNlciIsIm5hbWUiOiJ0ZXN0VXNlciJ9.signature'
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'token') return mockToken
            return null
        })

        render(<UserHome />)


        const usernameElement = screen.findByTestId('userName')
        expect(usernameElement).toBeInTheDocument()
        expect(usernameElement).toHaveTextContent('Welcome testUser!')

        const roleElement = screen.getByTitle('role')
        expect(roleElement).toBeInTheDocument()
        expect(roleElement).toHaveTextContent('user')
        })

})
        */