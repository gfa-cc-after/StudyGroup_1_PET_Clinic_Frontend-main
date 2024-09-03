import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react';
import usePets from "../../src/hooks/usePets";
import { useAuth } from "../../src/hooks/store";

vi.mock('axios');
vi.mock("../../src/utils", () => ({
    getBaseURL: () => 'http://localhost:3001'
}));

vi.mock("../../src/hooks/store", () => ({
    useAuth: () => ({
        token: 'some.token'
    })
}));


describe('usePets hook test', () => {

    it('should set the pets from the mock endpoint', async () => {
        const mockPets = [
            {
                petName: 'Max',
                petBreed: 'Dog',
                petSex: 'Male',
                petBirthDate: '2015.04.21',
                lastCheckUp: '2024.01.01',
                nextCheckUp: '2025.01.01',
                specialCondition: 'No issues'
            },
            {
                petName: 'Socks',
                petBreed: 'Cat',
                petSex: 'Female',
                petBirthDate: '2012.12.12',
                lastCheckUp: '2023.08.08',
                nextCheckUp: '2024.08.08',
                specialCondition: 'It is a cat, a very special one'
            }
        ];
        // Mock the response data
        const mockGet = vi.fn().mockResolvedValue(
            { data: { pets: mockPets } }
        );
        const axiosMock = vi.spyOn(axios, 'get');
        axiosMock.mockResolvedValue({ data: { pets: mockPets } });

        // Call the usePets hook
        const { result } = renderHook(() => usePets());

        // Assert that the pets state has been set correctly
        await waitFor(() => {
            expect(result.current.pets).toEqual(mockPets);
            expect(axiosMock).toBeCalledTimes(1);
            expect(axiosMock).toBeCalledWith('http://localhost:3001/api/v1/user/pets', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer some.token"
                }
            }
            )
        });
    })
});
