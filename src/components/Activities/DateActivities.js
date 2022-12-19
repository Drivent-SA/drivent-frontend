import styled from 'styled-components';

export default function DateActivities({ date, showTable, setShowTable }) {
  function isClicked() {
    if (showTable.date === date) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <DateButton
        isClicked={isClicked()}
        onClick={() => {
          if (showTable.date === date) {
            setShowTable({ date: '', isShown: false });
          } else {
            setShowTable({ date, isShown: true });
          }
        }}
      >
        {date}
      </DateButton>
    </>
  );
}

const DateButton = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  width: 131px;
  height: 37px;
  background-color: ${({ isClicked }) => (isClicked ? '#FFD37D' : '#E0E0E0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
