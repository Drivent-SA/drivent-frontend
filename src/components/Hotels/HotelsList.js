import styled from 'styled-components';
import HotelComponent from './HotelComponent';

export default function HotelsList({ hotels }) {
  return (
    <>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
      <HotelsContainer>
        {hotels === null ? (
          <></>
        ) : (
          hotels.map((hotel, index) => <HotelComponent name={hotel.name} image={hotel.image} key={index} />)
        )}
      </HotelsContainer>
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
