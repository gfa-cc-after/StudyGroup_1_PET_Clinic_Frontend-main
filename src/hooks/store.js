import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { jwtDecode } from "jwt-decode";

const useAuth = create(devtools(persist((set) => ({
  token: null,
  user: {
    id: null,
    displayName: null,
    role: null,
    email: null,
  },

  setUser: (token) => {
    const { role, displayName, email, id } = jwtDecode(token);
    set({ token, user: { role, displayName, email, id } });
  },

  logout: () => {
    set({ token: null, user: { displayName: null, role: null, email: null, id: null } });
    useAuth.persist.clearStorage();
  }
}), {
  name: 'auth',
})));

export { useAuth }