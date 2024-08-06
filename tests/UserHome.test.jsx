import React from 'react'
import { render, screen } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'
import jwt_decode from 'jwt-decode'
import UserHome from '../src/components/UserHome'
import axios from 'axios'

vi.mock('jwt_decode')

describe('UserHome', () => {

    const mockToken = 'mocked.jwt.token';
    const mockDecodedToken = {
    name: 'John Doe',
    role: 'user'}

    it('should render the page', async () => {
        render(<UserHome />)


    })})