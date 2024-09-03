import axios from "axios";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react';
import { useLoginForm } from "../../src/hooks/loginForm";
import { BrowserRouter } from "react-router-dom";

vi.mock('axios');
vi.mock("../../src/utils", () => ({
    getBaseURL: () => 'http://localhost:3001'
}));

describe('loginForm hook test', () => {

    it('should login if callLogin called', async () => {
        const mockLoginResponse = {
            token: ""
        };
        const axiosMock = vi.spyOn(axios, 'post');
        axiosMock.mockResolvedValue({ data: { ...mockLoginResponse } });

        // Call the usePets hook
        const { result } = renderHook(() => useLoginForm(), {
            wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>
        });

        // Call the callLogin function
        await waitFor(async () => await result.current.callLogin());
        expect(axiosMock).toHaveBeenCalled();
        expect(axiosMock).toHaveBeenCalledWith('http://localhost:3001/api/v1/auth/login',
            { email: '', password: '' },
            { headers: { 'Content-Type': 'application/json' } }
        );
    })
});
