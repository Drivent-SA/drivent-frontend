import styled from 'styled-components';

export default function HotelComponent({ name, image }) {
  return (
    <>
      <HotelBox>
        <HotelImage src={image} alt="Imagem do hotel" />
        <HotelName>{name}</HotelName>
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
`;
