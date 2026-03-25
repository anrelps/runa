import api from '../../utils/api';

interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const userLogin = async ({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  const res = await api.post('/login', { email, password });
  return res.data;
};

export const getUserData = async (): Promise<User> => {
  const res = await api.get('/user/profile');
  return res.data.user;
};
