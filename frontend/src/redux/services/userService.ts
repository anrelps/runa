import api from '../../utils/api';

interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: object;
  token: string;
}

export const userLogin = async ({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  const res = await api.post('/login', { email, password });
  return res.data;
};
