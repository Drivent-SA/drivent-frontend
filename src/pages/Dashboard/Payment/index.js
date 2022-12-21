import PaymentsComponent from '../../../components/Payments/PaymentsComponent';
import TicketsComponent from '../../../components/Tickets/TicketsComponents';

import { useState } from 'react';

export default function Payment() {
  const [ ticketReserved, setTicketReserved ] = useState(false);

  return (
    <>
      {
        ticketReserved ?
          <PaymentsComponent /> :
          <TicketsComponent setTicketReserved={setTicketReserved} />
      }
    </>
  );
}
