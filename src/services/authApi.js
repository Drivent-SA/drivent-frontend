import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}
//

export async function logInWithOauth(email) {
  const response = await api.post('/auth/oauth', { email });
  return response.data;
}
