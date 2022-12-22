import PaymentsComponent from '../../../components/Payments/PaymentsComponent';
import TicketsComponent from '../../../components/Tickets/TicketsComponents';

import { useState } from 'react';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const { ticket } = useTicket();
  function showError() {
    if (ticket?.TicketType?.price !== undefined) {
      return (<PaymentsComponent/>);
    } else {
      return <TicketsComponent ticketReserved={ticketReserved} setTicketReserved={setTicketReserved} />;
    }
  }
  const [ ticketReserved, setTicketReserved ] = useState(false);

  return (
    <>
      {showError()}
    </>
  );
}
