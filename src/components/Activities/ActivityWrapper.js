import dayjs from 'dayjs';
import styled from 'styled-components';

export default function ActivityWrapper({ title, startTime, endTime, duration, availableSeats }) {
  return (
    <Wrapper duration={duration}>
      <DetailsWrapper>
        <h6>{title}</h6>
        <span>{`${dayjs(startTime).format('HH:mm')} - ${dayjs(endTime).format('HH:mm')}`}</span>
      </DetailsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 265px;
  height: ${({ duration }) => `${80 * duration + 10 * (duration - 1)}px`};
  background: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  font-family: 'Roboto';
  display: flex;
`;

const DetailsWrapper = styled.div`
  height: 100%;
  width: 190px;
  padding-right: 10px;
  border-right: 1px solid #cfcfcf;
  color: #343434;
  font-size: 12px;

  h6 {
    font-weight: 700;
    word-break: break-word;
    margin-bottom: 6px;
  }
  span {
    font-weight: 400;
  }
`;
