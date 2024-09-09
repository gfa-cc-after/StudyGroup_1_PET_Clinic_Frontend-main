import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { BrowserRouter as MemoryRouter } from 'react-router-dom'
import UserHome from '../../src/components/UserHome'
import usePets from '../../src/hooks/usePets'

vi.mock('jwt-decode', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    jwtDecode: vi.fn().mockReturnValue({ displayName: 'testUser', role: 'user' })
  }
})

vi.mock('../../src/hooks/usePets', () => ({
  default: vi.fn()
}))


describe('UserHome', () => {
  it('renders user home page with username', async () => {

    const mockToken = 'header.eyJyb2xlIjoidXNlciIsIm5hbWUiOiJ0ZXN0VXNlciJ9.signature'
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'token') return mockToken
      return null
    })

    const mockPets = [
      {
        petName: 'Buddy',
        petBreed: 'Golden Retriever',
        petSex: 'Male',
        petBirthDate: '2020-01-01',
        lastCheckUp: '2021-01-01',
        nextCheckUp: '2022-01-01',
        specialCondition: 'None'
      },
      {
        petName: 'Mittens',
        petBreed: 'Siamese Cat',
        petSex: 'Female',
        petBirthDate: '2019-05-05',
        lastCheckUp: '2021-05-05',
        nextCheckUp: '2022-05-05',
        specialCondition: 'Asthma'
      }
    ]
    usePets.mockReturnValue(mockPets)

    render(
      <MemoryRouter>
        <UserHome />
      </MemoryRouter>
    )

    const usernameElement = await screen.findByTestId('welcomeId')
    expect(usernameElement).toBeInTheDocument()
    expect(usernameElement).toHaveTextContent('Welcome testUser')

    expect(usePets).toHaveBeenCalled()

    const petList = await screen.findByTestId('pet-table')
    expect(petList).toBeInTheDocument()
    expect(petList).toHaveTextContent('Buddy')
    expect(petList).toHaveTextContent('Mittens')
    expect(petList).toHaveTextContent('Golden Retriever')
    expect(petList).toHaveTextContent('Asthma')

    const headers = ['#', 'Name', 'Breed', 'Sex', 'Birth date', 'Last medical check up', 'Next medical check up', 'Special condition']
    headers.forEach(header => {
      expect(petList).toHaveTextContent(header)
    })
  })
});