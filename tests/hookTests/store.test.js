import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../../src/hooks/store'
import { act } from "react";

describe('useAuth hook test', () => {
    it('should NOT update user and token when the token response is invalid or missing', async () => {
        const renderedHook = renderHook(() => useAuth())

        expect(renderedHook.result.current.token).toBe(null)
    })

    it('should set the user and token from the mock when the token response is valid', async () => {
        const renderedHook = renderHook(() => useAuth())

        act(() => {
            renderedHook.result.current.setUser('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImRpc3BsYXlOYW1lIjoidiIsImlkIjoiNCIsImVtYWlsIjoidm96YXJkQHQtZW1haWwuaHUiLCJzdWIiOiJ2b3phcmRAdC1lbWFpbC5odSIsImlhdCI6MTcyNTMxMDEwOCwiZXhwIjoxNzI1MzExOTA4fQ.Uf-iKyQoQ0vtg74KH-DJnJhOaRK3GacgknJWyh4ltkc')
        })

        expect(renderedHook.result.current.token).not.toBe(null)
        expect(renderedHook.result.current.role).not.toBe(null)
        expect(renderedHook.result.current.role).toBe('user')
    })
})