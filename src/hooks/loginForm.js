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
  const { user, setUser } = useAuth();
  const { role } = user;

  const callLogin = async () => {
    try {
      const loginresponse = await loginRequest(email, password);
      setUser(loginresponse.data.token);
      setTimeout(() => {
        if (role === 'user') navigate('/user/home');
        if (role === 'admin') navigate('/admin/home');
      }, 3000)
    } catch (err) {
      console.error({ err });
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