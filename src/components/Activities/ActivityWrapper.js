import dayjs from 'dayjs';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import useEnrollInActivity from '../../hooks/api/useEnrollInActivity';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function ActivityWrapper({ id, title, startTime, endTime, duration, availableSeats, activityBooking, refresh, setRefresh }) {
  const { postEnrollInActivity } = useEnrollInActivity(id);
  const { userData } = useContext(UserContext);

  async function enrollInActivity() {
    try {
      await postEnrollInActivity();
      setRefresh(!refresh);
      toast('Inscrição na atividade realizada com sucesso!');
    } catch (error) {
      toast('Não foi possível realizar a inscrição na atividade!');
    }
  }

  let isSubscribed = false;
  if (activityBooking !== undefined) {
    const userBooking = activityBooking.some(value => value.userId === userData.user.id);
    if (userBooking) {
      isSubscribed = true;
    }
  }

  return (
    <Wrapper duration={duration} isSubscribed={isSubscribed}>
      <DetailsWrapper>
        <h6>{title}</h6>
        <span>{`${dayjs(startTime).format('HH:mm')} - ${dayjs(endTime).format('HH:mm')}`}</span>
      </DetailsWrapper>
      <AvailabilityWrapper availableSeats={availableSeats}>
        {availableSeats > 0 ?
          (isSubscribed ? (
            <>
              <AiOutlineCheckCircle />
              <p>Inscrito</p>
            </>
          ) : (
            <>
              <BiLogIn onClick={enrollInActivity} />
              <p>{availableSeats === 1 ? `${availableSeats} vaga` : `${availableSeats} vagas`}</p>
            </>
          ))
          : (
            <>
              <AiOutlineCloseCircle />
              <p>Esgotado</p>
            </>
          )}
      </AvailabilityWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 265px;
  height: ${({ duration }) => `${80 * duration + 10 * (duration - 1)}px`};
  background: ${props => props.isSubscribed ? '#D0FFDB' : '#f1f1f1'};
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

const AvailabilityWrapper = styled.div`
  width: 55px;
  height: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ availableSeats }) => (availableSeats > 0 ? '#078632' : '#CC6666')};

  svg {
    font-size: 20px;
    margin-bottom: ${({ availableSeats }) => (availableSeats > 0 ? '4.5px' : '6px')};
  }
  p {
    width: 100%;
    font-size: 9px;
    text-align: center;
  }
`;
