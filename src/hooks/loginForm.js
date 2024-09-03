import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./store";
import { toast } from "react-toastify";
import { login as loginRequest } from '../utils/httpClient'


const useLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, role, setUserWithToken } = useAuth();

  const callLogin = async () => {
    try {
      const loginresponse = await loginRequest(email, password);
      setUserWithToken(loginresponse.data.token);
      // why is the role changed only after the second trigger? 🤔
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