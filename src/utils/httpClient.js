import axios from "axios";
import { getBaseURL } from "./index";

const axiosInstane = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: getBaseURL()
})

const login = async (email, password) => {
  return await axiosInstane.post('/api/v1/auth/login', { email, password });
}

const register = async (email, password, displayName) => {
  return await axiosInstane.post('/api/v1/auth/register', { email, password, displayName });
}

const getPets = async (token) => {
  return await axiosInstane.get('/api/v1/user/pets', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

const addPet = async (token, pet) => {
  return await axiosInstane.post('/api/v1/user/pet', pet, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

const getClinics = async (token) => {

  return await axiosInstane.get('/api/v1/admin/clinics', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export { login, getPets, register, addPet, getClinics };