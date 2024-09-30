import { describe, expect, it } from "vitest";
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../src/hooks/store'

describe('useAuth hook test', () => {
    it('should NOT update user and token when the token response is invalid or missing', async () => {
        const renderedHook = renderHook(() => useAuth())

        expect(renderedHook.result.current.token).toBe(null)
    })

    it('should set the user and token from the mock when the token response is valid', async () => {
        const renderedHook = renderHook(() => useAuth())

        act(() => {
            renderedHook.result.current.setUser('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImRpc3BsYXlOYW1lIjoidGVzdFVzZXIiLCJpZCI6IjIiLCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJzdWIiOiJ0ZXN0QHVzZXIuY29tIiwiaWF0IjoxNzI1OTE3NTE1LCJleHAiOjE3MjU5MTkzMTV9.GK8y9yFzuNhUzDU9t9csJKCwdrPab-BzP6yyoMfanLI')
        })

        expect(renderedHook.result.current.token).not.toBe(null)
        expect(renderedHook.result.current.role).not.toBe(null)
        expect(renderedHook.result.current.user.email).not.toBe(null)
        expect(renderedHook.result.current.user.role).toBe('user')
        expect(renderedHook.result.current.user.email).toBe('test@user.com')
        expect(renderedHook.result.current.user.displayName).toBe('testUser')
    })
})