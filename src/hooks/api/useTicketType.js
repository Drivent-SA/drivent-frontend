import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: ticketsType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: getTicketType,
  } = useAsync(() => ticketApi.getTicketType(token));

  return {
    ticketsType,
    ticketTypeLoading,
    ticketTypeError,
    getTicketType,
  };
};
