import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { jwtDecode } from "jwt-decode";

const useAuth = create(devtools((set) => ({
  token: null,
  role: null,
  displayName: null,

  setUserWithToken: (jwtToken) => set((state) => {
    try {
      const { role, displayName } = jwtDecode(jwtToken);
      return {
        ...state,
        token: jwtToken,
        role,
        displayName
      }
    } catch (error) {
      return {
        token: null,
        role: null,
        displayName: null
      }
    }
  }),
  logout: () => set({ token: null, role: null }),
})));

export { useAuth };