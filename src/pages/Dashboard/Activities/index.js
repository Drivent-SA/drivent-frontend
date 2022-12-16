import { Typography } from '@material-ui/core';
import { useState } from 'react';
import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';

export default function Activities() {
  const [ticketData, setTicketData] = useState();

  function showError() {
    if (ticketData?.status !== 'PAID') {
      return (
        <ErrorMessageWrapper>
          Você precisa ter confirmado pagamento antes de fazer a escolha de atividades
        </ErrorMessageWrapper>
      );
    }
    if (ticketData?.ticketType?.isRemote) {
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
