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
  const clinics = [
    {
      id: 1,
      name: 'Clinic 1',
      address: 'Address 1',
      phone: '1234567890',
      email: 'email@example.com'
    },
    {
      id: 2,
      name: 'Clinic 2',
      address: 'Address 2',
      phone: '9876543210',
      email: 'email2@example.com'
    }
  ];

  return clinics;
  // TODO: Uncomment this when the backend endpoint is implemented
  // return await axiosInstane.get('/api/v1/admin/clinics', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`
  //   }
  // });
}

export { login, getPets, register, addPet, getClinics };