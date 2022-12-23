import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useRooms from '../../hooks/api/useRooms';

export default function HotelComponent({ name, image, id, hotel, setHotel }) {
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

  const selectHotel = () => {
    if (hotel.data?.id === id) return true;
    return false;
  };

  let totalVacancies = 0;
  let bookings = 0;
  let isSingle = false;
  let isDouble = false;
  let isTriple = false;

  if (roomsData) {
    roomsData.map(room => {
      totalVacancies += room.capacity;
      bookings += room.Booking.length;
      if (room.capacity === 1) return isSingle = true;
      if (room.capacity === 2) return isDouble = true;
      if (room.capacity >= 3) return isTriple = true;
      return false;
    });
  }

  let accommodations = [];
  if (isSingle) accommodations.push('Single');
  if (isDouble) accommodations.push('Double');
  if (isTriple) accommodations.push('Triple');

  let accommodationsDescription = '';
  if (accommodations.length === 1) {
    accommodationsDescription = accommodations[0];
  } else if (accommodations.length === 2) {
    accommodationsDescription = `${accommodations[0]} e ${accommodations[1]}`;
  } else {
    accommodationsDescription = `${accommodations[0]}, ${accommodations[1]} e ${accommodations[2]}`;
  }

  const availableVacancies = totalVacancies - bookings;

  return (
    <>
      <HotelBox selectHotel={selectHotel()} onClick={clickHotel}>
        <HotelImage src={image} alt="Imagem do hotel" />
        <HotelName>{name}</HotelName>
        <Subtitle type="accommodations">Tipos de acomodação:</Subtitle>
        <HotelData>{accommodationsDescription}</HotelData>
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
  background-color: ${ ({ selectHotel }) => ( selectHotel ? '#ffeed2' : '#ebebeb')};
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
