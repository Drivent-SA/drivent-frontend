// import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';
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

/*
import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';
import PaymentsComponent from '../../../components/Payments/PaymentsComponent';
import useTicket from '../../../hooks/api/useTicket';
import { useEffect } from 'react';

export default function Payment() {
  const { ticket } = useTicket();
  console.log(ticket);
  function showError() {
    if (ticket?.TicketType?.price !== undefined) {
      return (<PaymentsComponent/>);
    } else {
      return <ErrorMessageWrapper>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ErrorMessageWrapper>;
    }
  }
  return (
    <>
      {showError()}
>>>>>>> e22ad43085eb56fc0a8f4901a61e2b548b2cc3b6
    </>
  );
}
*/
