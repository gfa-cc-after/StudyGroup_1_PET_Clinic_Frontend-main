import AddPetForm from '../../src/components/AddPetForm'
import { useAuth } from '../../src/hooks/store'
import { render, fireEvent, waitFor, renderHook, act } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

vi.mock('axios')

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  )
}

describe('AddPetForm', () => {
  it('should render the form', async () => {
    const { getByLabelText, findAllByRole, getByRole } = renderWithRouter(<AddPetForm />)

    const heading = getByRole('heading', { level: 1, name: 'Add Pet' })
    expect(heading).toBeInTheDocument()

    const petNameInput = getByLabelText('Name:*')
    expect(petNameInput).toBeInTheDocument()
    expect(petNameInput).toHaveAttribute('type', 'text')
    expect(petNameInput).toBeRequired()

    const petBreedInput = getByLabelText('Breed:*')
    expect(petBreedInput).toBeInTheDocument()
    expect(petBreedInput).toHaveAttribute('type', 'text')
    expect(petBreedInput).toBeRequired()

    const petSexSelect = getByRole('combobox', { name: 'Sex:*' })
    expect(petSexSelect).toBeInTheDocument()
    expect(petSexSelect).toBeRequired()

    const petBirthDateInput = getByLabelText('Birth Date:*')
    expect(petBirthDateInput).toBeInTheDocument()
    expect(petBirthDateInput).toHaveAttribute('type', 'date')
    expect(petBirthDateInput).toBeRequired()

    const lastCheckUpInput = getByLabelText('Last Check-Up Date:')
    expect(lastCheckUpInput).toBeInTheDocument()
    expect(lastCheckUpInput).toHaveAttribute('type', 'date')

    const nextCheckUpInput = getByLabelText('Next Check-Up Date:')
    expect(nextCheckUpInput).toBeInTheDocument()
    expect(nextCheckUpInput).toHaveAttribute('type', 'date')

    const specialConditionTextarea = getByRole('textbox', { name: 'Special Condition:' })
    expect(specialConditionTextarea).toBeInTheDocument()

    const formButton = (await findAllByRole('button')).filter(button => button.textContent === 'Add')[0]
    expect(formButton).toBeInTheDocument()
    expect(formButton).toHaveAttribute('type', 'submit')
  })

  it('should send post request to backend on add click with the proper data', async () => {
    const mockPost = vi.fn().mockResolvedValue({
      data: {
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyMjkwMDcyOCwiZXhwIjoxNzIyOTAyNTI4fQ.9Fzi6MCTRjyIZ2dSRDVYCWxNZtQbF87THAWJFQ5AT8o",
        "role": "USER"
      }
    })
    axios.post = mockPost

    // Mock implementation of useAuth hook
    const renderedHook = renderHook(() => useAuth())

    act(() => {
        renderedHook.result.current.setUser('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyMjkwMDcyOCwiZXhwIjoxNzIyOTAyNTI4fQ.9Fzi6MCTRjyIZ2dSRDVYCWxNZtQbF87THAWJFQ5AT8o')
    })

    const { getByLabelText, findAllByRole } = renderWithRouter(<AddPetForm />)

    const petNameInput = getByLabelText('Name:*')
    const petBreedInput = getByLabelText('Breed:*')
    const petSexSelect = getByLabelText('Sex:*')
    const petBirthDateInput = getByLabelText('Birth Date:*')
    const lastCheckUpInput = getByLabelText('Last Check-Up Date:')
    const nextCheckUpInput = getByLabelText('Next Check-Up Date:')
    const specialConditionTextarea = getByLabelText('Special Condition:')
    const formButton = (await findAllByRole('button')).filter(button => button.textContent === 'Add')[0]

    fireEvent.change(petNameInput, { target: { value: 'Max' } })
    fireEvent.change(petBreedInput, { target: { value: 'dog' } })
    fireEvent.change(petSexSelect, { target: { value: 'Male' } })
    fireEvent.change(petBirthDateInput, { target: { value: '2024-01-01' } });
    fireEvent.change(lastCheckUpInput, { target: { value: '2024-06-15' } });
    fireEvent.change(nextCheckUpInput, { target: { value: '2024-08-15' } });
    fireEvent.change(specialConditionTextarea, { target: { value: 'No conditions' } });

    fireEvent.click(formButton);

    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining('/user/pet'),
      {
        "petName": "Max",
        "petBreed": "dog",
        "petSex": "Male",
        "petBirthDate": "2024-01-01",
        "lastCheckUp": "2024-06-15",
        "nextCheckUp": "2024-08-15",
        "specialCondition": "No conditions"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyMjkwMDcyOCwiZXhwIjoxNzIyOTAyNTI4fQ.9Fzi6MCTRjyIZ2dSRDVYCWxNZtQbF87THAWJFQ5AT8o"
        }
      }
    )
  })
})