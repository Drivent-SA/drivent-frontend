import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';

export default function PaymentsComponent() {
  const { ticket } = useTicket();
  
  const hotel = ticket?.TicketType?.includesHotel ? ('Com Hotel'):('Sem Hotel');
  const remote = ticket?.TicketType?.isRemote ? ('Remoto'):('Presencial');
  const price = Number(ticket?.TicketType?.price)/100;
  return (

    <>
      <Subtitle>Ingresso escolhido</Subtitle>
      <ResumeContainer>
        <ResumeTitle>{hotel} + {remote}</ResumeTitle>
        <ResumeSubitle>R$ {price}</ResumeSubitle>
      </ResumeContainer>
    </>
  );
}

const Subtitle = styled.h3`
  margin-top: 9px;
  margin-bottom: 23px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #8e8e8e;
`;
const ResumeContainer = styled.div`
  background: #FFEED2;
  border-radius: 20px;
  width: 290px;
  height: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ResumeTitle = styled.p`
  font-family: 'Roboto';
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #454545;
`;
const ResumeSubitle = styled.p`
  margin-top: 8px;
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #898989;
`;
