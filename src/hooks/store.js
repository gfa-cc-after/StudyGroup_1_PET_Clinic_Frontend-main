import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { jwtDecode } from "jwt-decode";

const useAuth = create()(devtools((set) => ({
  token: null,
  role: null,
  displayName: null,

  login: (jwtToken) => set((state) => (
    {
      ...state,
      token: jwtToken,
      role: jwtDecode(jwtToken).role,
      displayName: jwtDecode(jwtToken).displayName
    })),
  logout: () => set({ token: null, role: null }),
})));

export { useAuth };