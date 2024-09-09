import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { jwtDecode } from "jwt-decode";

const useAuth = create(devtools(persist((set) => ({
      token: null,
      user: {
        displayName: null,
        role: null
      },

      setUser: (token) => {
        const { role, displayName } = jwtDecode(token);
        set({ token, user: { role, displayName } });
      },

      logout: () => {
        set({ token: null, user: { displayName: null, role: null } });
        useAuth.persist.clearStorage();
      }
    }), { 
      name: 'auth',
    })));

export { useAuth }