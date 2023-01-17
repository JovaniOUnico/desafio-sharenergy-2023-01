import axios from 'axios';

const api = axios.create({
  baseURL: process.env.SHARE_ENERGY_SERVER
});

api.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

export const useApi = () => ({
  verifyToken: async (token: string) => {
    const response = await api.post('/user/verify', {token: token});
    return response.data;
  },
  signin: async (email: string, password: string) => {
    const response = await api.post('/user/login', {email: email, password: password});
    return response.data;
  },
  signup: async (name: string, email: string, password: string) => {
    const response = await api.post('/user/new', JSON.stringify({name: name,email:  email, password: password}));
    return response.data;
  },
  logout: async (email: string, token: string) => {
    const response = await api.post('/user/logout', {email: email, token: token});
    return response.data;
  }
});