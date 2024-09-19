import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { jwtDecode } from "jwt-decode";

const useAuth = create(devtools(persist((set) => ({
      token: null,
      user: {
        displayName: null,
        role: null,
        email: null,
      },

      setUser: (token) => {
        const { role, displayName, email } = jwtDecode(token);
        set({ token, user: { role, displayName, email } });
      },

      logout: () => {
        set({ token: null, user: { displayName: null, role: null, email: null } });
        useAuth.persist.clearStorage();
      }
    }), { 
      name: 'auth',
    })));

export { useAuth }