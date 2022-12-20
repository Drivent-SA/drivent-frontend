import api from './api';

export async function getUserTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getTicketType(token) {
  try {
    const response = await api.get('/tickets/types', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export async function createTicket(body, token) {
  try {
    const response = await api.post('/tickets', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};
