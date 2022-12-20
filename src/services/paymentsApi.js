import api from './api';

export async function postPayment(body, token) {
  const response = await api.post('/enrollments', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

