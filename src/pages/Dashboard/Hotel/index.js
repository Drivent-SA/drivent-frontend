import { Typography } from '@material-ui/core';
import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';
import HotelsList from '../../../components/Hotels/HotelsList';
import useHotels from '../../../hooks/api/useHotels';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket } = useTicket();
  const { hotels } = useHotels();

  function showError() {
    if (ticket?.status !== 'PAID') {
      return (
        <ErrorMessageWrapper>
          Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
        </ErrorMessageWrapper>
      );
    }
    if (ticket?.TicketType?.isRemote || !ticket?.TicketType?.includesHotel) {
      return (
        <ErrorMessageWrapper>
          {`Sua modalidade de ingresso não inclui hospedagem
          Prossiga para a escolha de atividades`}
        </ErrorMessageWrapper>
      );
    }
    return false;
  }

  return (
    <>
      <Typography variant="h4">Escolha de hotel e quarto</Typography>
      {showError()}
      {showError() === false ? <HotelsList hotels={hotels} /> : <></>}
    </>
  );
}
