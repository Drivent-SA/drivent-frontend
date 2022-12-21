import styled from 'styled-components';

export default function BookingSummary({ booking, setTrade }) {
  const capacityName = () => {
    if (booking.Room.capacity === 1)
      return {
        number: 'Single',
        people: 'Somente você',
      };
    if (booking.Room.capacity === 2)
      return {
        number: 'Double',
        people: 'Você e mais 1',
      };
    if (booking.Room.capacity >= 3)
      return {
        number: 'Triple',
        people: 'Você e mais 2',
      };
  };

  return (
    <SummaryBox>
      <SummaryMessage>Você já escolheu o seu quarto:</SummaryMessage>
      <Infos>
        <HotelImage src={booking.Room.Hotel.image} alt="Hotel image" />
        <HotelName>{booking.Room.Hotel.name}</HotelName>
        <h5>Quarto reservado</h5>
        <Paragraph>
          {booking.Room.name} ({capacityName().number})
        </Paragraph>
        <h5>Pessoas no seu quarto</h5>
        <Paragraph>{capacityName().people}</Paragraph>
      </Infos>
      <ChangeRoomButton
        onClick={() => {
          setTrade({
            id: booking.id,
            isTrading: true,
          });
        }}
      >
        TROCAR DE QUARTO
      </ChangeRoomButton>
    </SummaryBox>
  );
}

const SummaryBox = styled.section`
  margin-top: 36px;
  font-family: 'Roboto';
`;

const SummaryMessage = styled.h3`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;

  margin-bottom: 14px;
  color: #8e8e8e;
`;

const Infos = styled.div`
  width: 196px;
  height: 264px;

  background: #ffeed2;
  border-radius: 10px;
  padding: 16px 14px;

  h5 {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    margin-top: 12px;
    margin-bottom: 2px;

    color: #3c3c3c;
  }
`;

const HotelImage = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
`;

const HotelName = styled.h2`
  font-weight: 400;
  font-size: 20px;
  margin-top: 6px;
  line-height: 23.44px;

  color: #343434;
`;

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #3c3c3c;
`;

const ChangeRoomButton = styled.button`
  width: 182px;
  height: 37px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;

  margin-top: 46px;

  font-size: 14px;
  font-weight: 400;
  line-height: 16.41px;
  font-family: 'Roboto';

  cursor: pointer;
`;
