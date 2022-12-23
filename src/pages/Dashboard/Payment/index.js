import PaymentsComponent from '../../../components/Payments/PaymentsComponent';
import TicketsComponent from '../../../components/Tickets/TicketsComponents';

import { useState } from 'react';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const { ticket } = useTicket();
  const [ ticketReserved, setTicketReserved ] = useState(false);

  function showError() {
    if (ticket?.TicketType?.price !== undefined || ticketReserved) {
      return (<PaymentsComponent/>);
    } else {
      return <TicketsComponent ticketReserved={ticketReserved} setTicketReserved={setTicketReserved} />;
    }
  }

  return (
    <>
      {showError()}
    </>
  );
}
