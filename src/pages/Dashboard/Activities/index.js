import { Typography } from '@material-ui/core';
import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();

  function showError() {
    if (ticket?.status !== 'PAID') {
      return (
        <ErrorMessageWrapper>
          Você precisa ter confirmado pagamento antes de fazer a escolha de atividades
        </ErrorMessageWrapper>
      );
    }
    if (ticket?.TicketType?.isRemote === true) {
      return (
        <ErrorMessageWrapper>
          {`Sua modalidade de ingresso não necessita escolher
          atividade. Você terá acesso a todas as atividades.`}
        </ErrorMessageWrapper>
      );
    }
    return <></>;
  }

  return (
    <>
      <Typography variant="h4">Escolha de atividades</Typography>
      {showError()}
    </>
  );
}
