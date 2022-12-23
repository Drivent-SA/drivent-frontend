import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DateList from '../../../components/Activities';
import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';
import useActivities from '../../../hooks/api/useActivities';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();
  const { getActivities } = useActivities();
  const [activities, setActivities] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getActivities();
      setActivities(data);
    };

    fetchData();
  }, [refresh]);

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
    return false;
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {showError()}
      {showError() === false ? <DateList activities={activities} refresh={refresh} setRefresh={setRefresh} /> : <></>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 27px !important;
`;
