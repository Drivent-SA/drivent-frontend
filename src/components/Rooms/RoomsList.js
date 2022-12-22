import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function RoomsList({ id, name, capacity, selectedRoom, setSelectedRoom }) {
  const isFull = capacity.includes('full');
  const selectRoom = (id) => {
    setSelectedRoom({
      id: id,
      isClicked: true,
    });
  };

  const clicked = () => {
    if (selectedRoom.id === id) return true;
    return false;
  };

  return (
    <>
      {isFull ? (
        <RoomBoxFull onClick={ () => {
          setSelectedRoom({
            id: undefined,
            isClicked: false
          });
        }}>
          <RoomName>{name}</RoomName>
          <IconsBox>
            {capacity.map((icon, index) => (
              <BsPersonFill key={index} size="1.6em" style={{ color: '#8C8C8C' }} />
            ))}
          </IconsBox>
        </RoomBoxFull>
      ) : (
        <RoomBox 
          isClicked={clicked()} 
          onClick={() => selectRoom(id)}
        >
          <RoomName>{name}</RoomName>
          <IconsBox>
            {capacity.map((icon, index) => {
              switch (icon) {
              case 'outline':
                return <BsPerson key={index} size="1.6em" />;
              case 'filled':
                return <BsPersonFill 
                  key={index} 
                  size="1.6em" 
                  style={{ color: clicked() ? '#FF4791' : 'black' }} 
                />;
              default:
                return <></>;
              }
            })}
          </IconsBox>
        </RoomBox>
      )}
    </>
  );
}

const RoomBox = styled.div`
  font-family: 'Roboto';
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  background-color: ${({ isClicked }) => (isClicked ? '#FFEED2' : '#FFFFFF')};
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-right: 9px;
  padding-left: 16px;

  cursor: pointer;
`;

const RoomBoxFull = styled(RoomBox)`
  background-color: #e9e9e9;
`;

const RoomName = styled.h5`
  color: #454545;
  font-size: 20px;
  font-weight: 700;
`;

const IconsBox = styled.div``;
