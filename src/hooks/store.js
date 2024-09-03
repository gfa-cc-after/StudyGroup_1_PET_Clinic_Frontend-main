import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const useAuth = create((set) => ({
  token: null,
  user: {
    displayName: null,
    role: null
  },

  setUser: (token) => {
    const { role, displayName } = jwtDecode(token);
    set({ token, role, displayName });
  },

  logout: () => set({ token: null, user: { displayName: null, role: null } }),
}));

export { useAuth };