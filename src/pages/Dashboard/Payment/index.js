import PaymentsComponent from '../../../components/Payments/PaymentsComponent';
import TicketsComponent from '../../../components/Tickets/TicketsComponents';

import { useState } from 'react';
import useTicket from '../../../hooks/api/useTicket';
import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';

export default function Payment() {
  const { ticket } = useTicket();
  function showError() {
    if (ticket?.TicketType?.price !== undefined) {
      return (<PaymentsComponent/>);
    } else {
      return <TicketsComponent setTicketReserved={setTicketReserved} />;
    }
  }
  const [ ticketReserved, setTicketReserved ] = useState(false);

  return (
    <>
      {showError()}
    </>
  );
}
