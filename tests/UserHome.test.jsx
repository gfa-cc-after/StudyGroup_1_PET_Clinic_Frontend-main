import React from 'react'
import RegistrationForm from '../src/components/UserHome'
import { render, screen } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import jwt_decode from 'jwt-decode'
import UserHome from '../src/components/UserHome'

vi.mock('jwt_decode')

describe('UserHome', () => {

    const mockToken = 'mocked.jwt.token';
    const mockDecodedToken = {
    name: 'John Doe',
    role: 'user'}

  beforeEach(() => {
    // Mock localStorage
    localStorage.setItem('token', mockToken);
    jwt_decode.mockReturnValue(mockDecodedToken);
    })

    it('should render the page', async () => {
        render(<UserHome />)
        

    })})