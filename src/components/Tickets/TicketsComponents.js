import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import useEnrollment from '../../hooks/api/useEnrollment';
import useTicketType from '../../hooks/api/useTicketType';
import useCreateTicket from '../../hooks/api/useCreateTicket';

export default function TicketsComponent({ setTicketReserved }) {
  const { enrollment } = useEnrollment();
  const { ticketsType } = useTicketType();
  const { createTicket } = useCreateTicket();
  const [ dataTicketType, setDataTicketType ] = useState(null);
  const [ ticketTypePresentialWithHotel, setTicketTypePresentialWithHotel ] = useState({});
  const [ ticketTypePresentialNoHotel, setTicketTypePresentialNoHotel ] = useState({});
  const [ ticketTypeOnline, setTicketTypeOnline ] = useState({});
  const [ presential, setPresential ] = useState(false);       
  const [ online, setOnline ] = useState(false);
  const [ withHotel, setWithHotel ] = useState(false);       
  const [ noHotel, setNoHotel ] = useState(false);
  const [ infoTicketTypeId, setInfoTicketTypeId ] = useState({ ticketTypeId: '' });

  useEffect(() => {
    setDataTicketType(ticketsType);
  }, [ticketsType]);

  useEffect(() => {
    if(dataTicketType) {
      for(let i = 0; i < dataTicketType.length; i++)  {
        if(dataTicketType[i].name === 'Presencial Com Hotel') setTicketTypePresentialWithHotel(dataTicketType[i]);
        else if(dataTicketType[i].name === 'Presencial Sem Hotel') setTicketTypePresentialNoHotel(dataTicketType[i]);
        else setTicketTypeOnline(dataTicketType[i]);
      }
    }
  }, [dataTicketType]);

  function handleType(type) {
    if(type === 'Presential') {
      setPresential(true);
      setOnline(false);
    } else {
      setOnline(true);
      setPresential(false);
      setInfoTicketTypeId({ ticketTypeId: ticketTypeOnline.id });
    }
  }

  function handleHotel(type) {
    if(type === 'Com Hotel') {
      setWithHotel(true);
      setNoHotel(false);
      setInfoTicketTypeId({ ticketTypeId: ticketTypePresentialWithHotel.id });
    } else {
      setNoHotel(true);
      setWithHotel(false);
      setInfoTicketTypeId({ ticketTypeId: ticketTypePresentialNoHotel.id });
    }
  }

  async function handleTicket() {
    try {
      await createTicket(infoTicketTypeId);
      toast.success('Ingresso reservado com sucesso!');
      setTicketReserved(true);
    } catch (err) {
      toast.error('Não foi possível reservar o ingresso!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {
        enrollment ? 
          <>
            <Message>Primeiro, escolha sua modalidade de ingresso</Message>

            <TicketsOptions>
              <div 
                className={presential && !online ? 'backBorderColor' : ''} 
                onClick={() => handleType('Presential')}
              >
                <p className="name">Presencial</p>
                <p className="price">R$ {
                  ticketTypePresentialWithHotel && ticketTypePresentialNoHotel &&
                    ticketTypePresentialWithHotel.price < ticketTypePresentialNoHotel.price ?
                    ticketTypePresentialWithHotel.price : 
                    ticketTypePresentialNoHotel.price
                }</p>
              </div>

              <div 
                className={online && !presential ? 'backBorderColor' : ''} 
                onClick={() => handleType('Remote')}
              >
                <p className="name">Online</p>
                <p className="price">R$ {ticketTypeOnline && ticketTypeOnline.price}</p>
              </div>
            </TicketsOptions>
            
            {
              presential && !online &&
                <>
                  <Message>Ótimo! Agora escolha sua modalidade de hospedagem</Message>

                  <TicketsOptions>
                    <div 
                      className={noHotel && !withHotel ? 'backBorderColor' : ''} 
                      onClick={() => handleHotel('Sem Hotel')}
                    >
                      <p className="name">Sem Hotel</p>
                      <p className="price">+ R$ {
                        ticketTypePresentialNoHotel.price < ticketTypePresentialWithHotel.price ?
                          0 : 
                          ticketTypePresentialNoHotel.price - ticketTypePresentialWithHotel.price
                      }</p>
                    </div>

                    <div 
                      className={withHotel && !noHotel ? 'backBorderColor' : ''} 
                      onClick={() => handleHotel('Com Hotel')}
                    >
                      <p className="name">Com Hotel</p>
                      <p className="price">+ R$ {
                        ticketTypePresentialWithHotel.price < ticketTypePresentialNoHotel.price ?
                          0 : 
                          ticketTypePresentialWithHotel.price - ticketTypePresentialNoHotel.price
                      }</p>
                    </div>
                  </TicketsOptions>

                  {
                    withHotel && !noHotel &&
                      <>
                        <Message>Fechado! O total ficou em R$ {ticketTypePresentialWithHotel.price}. Agora é só confirmar:</Message>
                        <Button onClick={() => handleTicket('With Hotel')}>reservar ingresso</Button>
                      </>
                  }
                  {
                    noHotel && !withHotel &&
                    <>
                      <Message>Fechado! O total ficou em R$ {ticketTypePresentialNoHotel.price}. Agora é só confirmar:</Message>
                      <Button onClick={() => handleTicket('No Hotel')}>reservar ingresso</Button>
                    </>
                  }
                </>
            }
            {
              online && !presential &&
                <>
                  <Message>Fechado! O total ficou em R$ {ticketTypeOnline.price}. Agora é só confirmar:</Message>
                  <Button onClick={() => handleTicket('Remote')}>reservar ingresso</Button>
                </>
            }
          </> :
          <Container>
            <Message>Você precisa completar sua inscrição antes <br />
            de prosseguir pra escolha de ingresso</Message>
          </Container>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Container = styled.div`
  align-items: center;

  display: flex;

  height: 80%;

  justify-content: center;

  text-align: center;

  width: 100%;
`;

const Message = styled.p`
  color: #8E8E8E;

  font-size: 20px;

  font-weight: 400;

  line-height: 23px;
`;

const TicketsOptions = styled.div`
  display: flex;

  gap: 24px;

  margin: 17px 0 35px;

  div {
    align-items: center;

    border: 1px solid #CECECE;

    border-radius: 20px;

    cursor: pointer;

    display: flex;

    flex-direction: column;

    gap: 5px;

    height: 145px;

    justify-content: center;

    text-align: center;

    width: 145px;
  }

  div .name {
    color: #454545;

    font-size: 16px;

    font-weight: 400;

    line-height: 19px;
  }

  div .price {
    color: #898989;

    font-size: 14px;

    font-weight: 400;

    line-height: 16px;
  }

  .backBorderColor {
    background-color: #FFEED2;

    border-color: #FFEED2;
  }
`;

const Button = styled.button`
  background-color: #E0E0E0;

  border: none;

  border-radius: 4px;

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  color: #000000;

  cursor: pointer;

  font-size: 14px;

  font-weight: 400;

  height: 37px;

  line-height: 16px;

  margin-top: 17px;

  padding: 10px 12px;

  text-align: center;

  text-transform: uppercase;

  width: 180px;
`;
