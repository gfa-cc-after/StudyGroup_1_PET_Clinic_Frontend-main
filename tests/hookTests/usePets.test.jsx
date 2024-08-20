import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { renderHook } from '@testing-library/react-hooks';
import usePets from "../../src/hooks/usePets";

vi.mock('axios');

describe('usePets hook test', () => {

    it('should set the pets from the mock endpoint', async () => {
        // Mock the response data
        const mockGet = vi.fn().mockResolvedValue(
            {
                data:
                {
                    pets: [{
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
                    }]
                }
            }
        );
        axios.get = mockGet
        // Call the usePets hook
        const { result } = renderHook(() => usePets('http://somewherefromtheweb.com/api/pets'));
        await waitForNextUpdate();
        // Assert that the pets state has been set correctly
        expect(result.current.pets).toEqual([
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
        ])
    })
});
