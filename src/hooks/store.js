import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { jwtDecode } from "jwt-decode";

const useAuth = create()(devtools((set) => ({
  token: null,
  role: null,
  displayName: null,

  login: (jwtToken) => set((state) => {
    const decoded = jwtDecode(jwtToken);
    try {
      return {
        ...state,
        token: jwtToken,
        role: decoded.role,
        displayName: decoded.displayName
      }
    } catch (error) {
      console.error('Error decoding token: ', error);
      return {
        ...state,
        token: null,
        role: null,
        displayName: null
      }
    }
  }),
  logout: () => set({ token: null, role: null }),
})));

export { useAuth };