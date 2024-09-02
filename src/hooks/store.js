import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const useAuth = create((set) => ({
    token: null,
    role: null,
  
    login: (jwtToken) => {
      const decodedToken = jwtDecode(jwtToken);

      set({ token: jwtToken, role: decodedToken.role });
    },

    logout: () => set({ token: null, role: null}),
}));

export { useAuth };