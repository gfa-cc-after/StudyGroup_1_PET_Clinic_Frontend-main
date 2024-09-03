import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/store";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/api/v1/auth/login";

const useLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, role, token } = useAuth();

  const callLogin = async () => {
    try {
      const loginresponse = await axios
        .post(apiUrl, { email, password }, {
          headers:
            { "Content-Type": "application/json" }
        })
      login(loginresponse.data.token);

      setTimeout(() => {
        if (role === 'user') navigate('/user/home');
        if (role === 'admin') navigate('/admin/home');
      }, 3000)
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error('There was an error logging in...' + err.response.data.error);
      } else {
        toast.error('There was a network error');
      }
    }
  }

  return { email, setEmail, password, setPassword, callLogin };
}

export { useLoginForm };