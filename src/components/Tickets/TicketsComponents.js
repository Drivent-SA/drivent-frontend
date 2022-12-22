import { useState, useEffect } from 'react';
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
  const [ ticketsInfoStatus, setTicketsInfoStatus ] = useState({ 
    isRemote: '', 
    presential: '', 
    includesHotel: '',
    idRemote: '',
    priceRemote: '',
    idPresentialWithHotel: '',
    pricePresentialWithHotel: '',
    idPresentialNoHotel: '',
    pricePresentialNoHotel: '' 
  });

  useEffect(() => {
    if(ticketsType) {
      let idRemote, 
        priceRemote, 
        idPresentialWithHotel, 
        pricePresentialWithHotel, 
        idPresentialNoHotel, 
        pricePresentialNoHotel;

      for(let i = 0; i < ticketsType.length; i++) {
        const ticketType = ticketsType[i];

        if(ticketType.isRemote) {
          idRemote = ticketType.id;
          priceRemote = ticketType.price;
        } else if (!ticketType.isRemote && ticketType.includesHotel) {
          idPresentialWithHotel = ticketType.id;
          pricePresentialWithHotel = ticketType.price;
        } else if (!ticketType.isRemote && !ticketType.includesHotel) {
          idPresentialNoHotel = ticketType.id;
          pricePresentialNoHotel = ticketType.price;
        }
      }

      setTicketsInfoStatus({
        ...ticketsInfoStatus,
        idRemote,
        priceRemote,
        idPresentialWithHotel,
        pricePresentialWithHotel,
        idPresentialNoHotel,
        pricePresentialNoHotel
      });
    }
  }, [ticketsType]);

  async function handleTicket(id) {
    try {
      await createTicket({ ticketTypeId: id });
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
                className={ticketsInfoStatus.isRemote === false && ticketsInfoStatus.presential === true ? 'backBorderColor' : ''} 
                onClick={() => setTicketsInfoStatus({ ...ticketsInfoStatus, isRemote: false, presential: true })}
              >
                <p className="name">Presencial</p>
                <p className="price">R$ {
                  ticketsInfoStatus.pricePresentialWithHotel < ticketsInfoStatus.pricePresentialNoHotel ?
                    ticketsInfoStatus.pricePresentialNoHotel :
                    ticketsInfoStatus.pricePresentialNoHotel
                }</p>
              </div>

              <div 
                className={ticketsInfoStatus.isRemote === true && ticketsInfoStatus.presential === false ? 'backBorderColor' : ''} 
                onClick={() => setTicketsInfoStatus({ ...ticketsInfoStatus, isRemote: true, presential: false, includesHotel: '' })}
              >
                <p className="name">Online</p>
                <p className="price">R$ {ticketsInfoStatus.priceRemote}</p>
              </div>
            </TicketsOptions>
            
            {
              ticketsInfoStatus.isRemote === false && ticketsInfoStatus.presential === true &&
                <>
                  <Message>Ótimo! Agora escolha sua modalidade de hospedagem</Message>

                  <TicketsOptions>
                    <div 
                      className={ticketsInfoStatus.presential === true && ticketsInfoStatus.includesHotel === false ? 'backBorderColor' : ''} 
                      onClick={() => setTicketsInfoStatus({ ...ticketsInfoStatus, includesHotel: false })}
                    >
                      <p className="name">Sem Hotel</p>
                      <p className="price">+ R$ {
                        ticketsInfoStatus.pricePresentialNoHotel > ticketsInfoStatus.pricePresentialWithHotel ?
                          ticketsInfoStatus.pricePresentialNoHotel - ticketsInfoStatus.pricePresentialWithHotel :
                          0
                      }</p>
                    </div>

                    <div 
                      className={ticketsInfoStatus.presential === true && ticketsInfoStatus.includesHotel === true ? 'backBorderColor' : ''} 
                      onClick={() => setTicketsInfoStatus({ ...ticketsInfoStatus, includesHotel: true })}
                    >
                      <p className="name">Com Hotel</p>
                      <p className="price">+ R$ {
                        ticketsInfoStatus.pricePresentialWithHotel > ticketsInfoStatus.pricePresentialNoHotel ?
                          ticketsInfoStatus.pricePresentialWithHotel - ticketsInfoStatus.pricePresentialNoHotel :
                          0
                      }</p>
                    </div>
                  </TicketsOptions>

                  {
                    ticketsInfoStatus.presential === true && ticketsInfoStatus.includesHotel === true &&
                      <>
                        <Message>Fechado! O total ficou em R$ {ticketsInfoStatus.pricePresentialWithHotel}. Agora é só confirmar:</Message>
                        <Button onClick={() => handleTicket(ticketsInfoStatus.idPresentialWithHotel)}>reservar ingresso</Button>
                      </>
                  }
                  {
                    ticketsInfoStatus.presential === true && ticketsInfoStatus.includesHotel === false &&
                    <>
                      <Message>Fechado! O total ficou em R$ {ticketsInfoStatus.pricePresentialNoHotel}. Agora é só confirmar:</Message>
                      <Button onClick={() => handleTicket(ticketsInfoStatus.idPresentialNoHotel)}>reservar ingresso</Button>
                    </>
                  }
                </>
            }
            {
              ticketsInfoStatus.isRemote === true && ticketsInfoStatus.presential === false &&
                <>
                  <Message>Fechado! O total ficou em R$ {ticketsInfoStatus.priceRemote}. Agora é só confirmar:</Message>
                  <Button onClick={() => handleTicket(ticketsInfoStatus.idRemote)}>reservar ingresso</Button>
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
