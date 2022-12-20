import { useState } from 'react';
import styled from 'styled-components';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import RoomsList from '../Rooms/RoomsList';
import HotelComponent from './HotelComponent';

export default function HotelsList({ hotels }) {
  const [hotelClicked, setHotelClicked] = useState({
    id: undefined,
    data: undefined,
  });
  const [selectedRoom, setSelectedRoom] = useState({
    id: undefined,
    isClicked: false,
  });
  const { saveBooking } = useSaveBooking(selectedRoom.id);

  const organizeCapacityArray = (room) => {
    const capacityArray = [];

    if (room.capacity !== room.Booking.length) {
      for (let i = 0; i < room.capacity; i++) {
        capacityArray.push('outline');
      }
      for (let i = 0; i < room.Booking.length; i++) {
        capacityArray[room.capacity - i - 1] = 'filled';
      }
      return capacityArray;
    }

    for (let i = 0; i < room.capacity; i++) {
      capacityArray.push('full');
    }
    return capacityArray;
  };

  const sendSaveBooking = async() => {
    await saveBooking();
  };

  return (
    <>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
      <HotelsContainer>
        {hotels === null ? (
          <></>
        ) : (
          hotels.map((hotel, index) => (
            <HotelComponent
              name={hotel.name}
              image={hotel.image}
              key={index}
              id={hotel.id}
              setHotel={setHotelClicked}
            />
          ))
        )}
      </HotelsContainer>
      {hotelClicked.id ? <RoomsMessage>Ótimo pedido! Agora escolha seu quarto:</RoomsMessage> : <></>}
      <RoomsContainer>
        {hotelClicked.id ? (
          hotelClicked.data.Rooms.map((room, index) => {
            const capacityArray = organizeCapacityArray(room);
            return (
              <RoomsList
                id={room.id}
                name={room.name}
                capacity={capacityArray}
                key={index}
                bookingArray={room.Booking}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
            );
          })
        ) : (
          <></>
        )}
      </RoomsContainer>
      {selectedRoom.isClicked ? (
        <>
          <RoomsButton onClick={sendSaveBooking}>RESERVAR QUARTO</RoomsButton>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const Subtitle = styled.h3`
  margin-top: 34px;
  margin-bottom: 23px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #8e8e8e;
`;

const HotelsContainer = styled.section`
  display: flex;
  column-gap: 19px;
`;

const RoomsContainer = styled.section`
  display: flex;
  column-gap: 17px;
  row-gap: 8px;
  flex-wrap: wrap;
`;

const RoomsMessage = styled.h3`
  font-family: 'Roboto';
  margin-top: 40px;
  margin-bottom: 33px;

  color: #8e8e8e;
  font-size: 20px;
  font-weight: 400;
`;

const RoomsButton = styled.button`
  width: 182px;
  height: 37px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;

  margin-top: 46px;

  font-size: 14px;
  font-weight: 400;

  cursor: pointer;
`;
