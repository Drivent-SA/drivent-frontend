import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';
import PaymentsComponent from '../../../components/Payments/PaymentsComponent';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const { ticket } = useTicket();

  function showError() {
    if (ticket?.ticketType?.price !== undefined) {
      return (<PaymentsComponent/>);
    } else {
      return <ErrorMessageWrapper>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ErrorMessageWrapper>;
    }
  }
  return (
    <>
      {showError()}
    </>
  );
}
