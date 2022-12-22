import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useRooms from '../../hooks/api/useRooms';

export default function HotelComponent({ name, image, id, setHotel }) {
  const { getRooms } = useRooms(id);
  const [roomsData, setRoomsData] = useState();

  useEffect(async() => {
    const { Rooms } = await getRooms();
    setRoomsData(Rooms);
  }, []);

  const clickHotel = async(id) => {
    setHotel({
      id,
      data: await getRooms(),
    });
  };

  let totalVacancies = 0;
  let bookings = 0;
  if (roomsData) {
    roomsData.map(room => {
      totalVacancies += room.capacity;
      bookings += room.Booking.length;
    });
  }

  const availableVacancies = totalVacancies - bookings;

  return (
    <>
      <HotelBox onClick={clickHotel}>
        <HotelImage src={image} alt="Imagem do hotel" />
        <HotelName>{name}</HotelName>
        <Subtitle type="accommodations">Tipos de acomodação:</Subtitle>
        <HotelData>Single, Double e Triple</HotelData>
        <Subtitle type="vacancies">Vagas disponíveis:</Subtitle>
        <HotelData>{availableVacancies}</HotelData>
      </HotelBox>
    </>
  );
}

const HotelBox = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  padding: 16px 14px;
  background-color: #ebebeb;
  font-family: 'Roboto';

  cursor: pointer;
`;

const HotelImage = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
`;

const HotelName = styled.h5`
  color: #343434;
  margin-top: 5px;
  font-size: 16px;
  font-weight: 400;
  line-height: 23.44px;
`;

const Subtitle = styled.h6`
  color: #3C3C3C;
  margin-top: ${props => props.type === 'accomodations' ? '10px' : '14px'};
  font-size: 12px;
  font-weight: 700;
  line-height: 14.06px;
`;

const HotelData = styled.p`
  color: #343434;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.06px;
`;
