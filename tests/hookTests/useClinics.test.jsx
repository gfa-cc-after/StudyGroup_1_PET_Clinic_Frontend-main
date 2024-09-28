import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useClinics } from "../../src/hooks/useClinics";
import axios from "axios";
import * as httpClient from "../../src/utils/httpClient";

vi.mock('axios');

describe('useClinics hook test', async () => {
    it('should set the clinics from the mock endpoint', async () => {
        const mockClinics = [{
            name: 'MockClinic',
            address: '1000 Budapest, Rákóczi út 2.'
        },
        {
            name: 'MockClinic 2',
            address: '2000 Budapest, Szekeres utca 10.'
        }];

        //Mock the response data
        const axiosMock = vi.spyOn(httpClient, 'getClinics');
        axiosMock.mockResolvedValue({ data: { clinics: mockClinics } });

        // Call the useClinics hook
        const { result } = renderHook(() => useClinics());

        // Assert that the clinics state has been set correctly
        await waitFor(() => {
            expect(result.current.clinics).toEqual(mockClinics);
            expect(axiosMock).toBeCalledTimes(1);
        });
    });
})