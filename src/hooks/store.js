import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

const useAuth = create((set) => ({
  user: { role: null, displayName: null },
  token: null,
  setUser: (token) => {
    try {
      const { role, displayName } = jwtDecode(token);
      set(({ user: { role, displayName }, token }));
    } catch (e) {
      set(({ user: { role: null, displayName: null }, token: null }));
    }
  }
}))

export { useAuth }