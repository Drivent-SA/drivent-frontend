import { Typography } from '@material-ui/core';
import ErrorMessageWrapper from '../../../components/ErrorMessageWrapper';
import HotelsList from '../../../components/Hotels/HotelsList';
import useHotels from '../../../hooks/api/useHotels';
import useTicket from '../../../hooks/api/useTicket';
import useBooking from '../../../hooks/api/useBooking';
import BookingSummary from '../../../components/Hotels/BookingSummary';
import { useEffect, useState } from 'react';

export default function Hotel() {
  const { ticket } = useTicket();
  const { hotels } = useHotels();
  const { getBooking } = useBooking();
  const [refresh, setRefresh] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [tradeBooking, setTradeBooking] = useState({
    id: undefined,
    isTrading: false,
    loading: false,
  });

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

  useEffect(() => {
    const fetchData = async() => {
      setBookingData(await getBooking());
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      <Typography variant="h4">Escolha de hotel e quarto</Typography>
      {showError()}
      {showError() === false ? (
        bookingData !== null ? (
          !tradeBooking.isTrading ? (
            <BookingSummary booking={bookingData} setTrade={setTradeBooking} />
          ) : (
            <HotelsList
              hotels={hotels}
              trade={tradeBooking}
              setTrade={setTradeBooking}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )
        ) : (
          <HotelsList
            hotels={hotels}
            trade={tradeBooking}
            setTrade={setTradeBooking}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )
      ) : (
        <></>
      )}
    </>
  );
}
