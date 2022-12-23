import dayjs from 'dayjs';
import styled from 'styled-components';
import ActivityWrapper from './ActivityWrapper';

export default function ActivitiesTable({ dateActivities, refresh, setRefresh }) {
  const activities = dateActivities.map((value) => {
    const timeDifference = dayjs(value.endTime).diff(dayjs(value.startTime), 'hour', true);
    const availableSeats = value.capacity - value.ActivityBooking?.length;

    return { ...value, duration: timeDifference, availableSeats };
  });

  function compareByStartTime(a, b) {
    if (a.startTime < b.startTime) {
      return -1;
    }
    else {
      return 1;
    }
  }
  activities.sort(compareByStartTime);

  const mainActivities = activities.filter((value) => value.place === 'AUDITORIO_PRINCIPAL');
  const sideActivities = activities.filter((value) => value.place === 'AUDITORIO_LATERAL');
  const workshopActivities = activities.filter((value) => value.place === 'SALA_DE_WORKSHOP');

  return (
    <Container>
      <TableWrapper>
        <TableTitle>Auditório Principal</TableTitle>
        <PlaceTable isFirst={true}>
          {mainActivities.map((value, index) => (
            <ActivityWrapper
              key={index}
              id={value.id}
              title={value.title}
              startTime={value.startTime}
              endTime={value.endTime}
              duration={value.duration}
              availableSeats={value.availableSeats}
              activityBooking={value.ActivityBooking}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        </PlaceTable>
      </TableWrapper>
      <TableWrapper>
        <TableTitle>Auditório Lateral</TableTitle>
        <PlaceTable>
          {sideActivities.map((value, index) => (
            <ActivityWrapper
              key={index}
              id={value.id}
              title={value.title}
              startTime={value.startTime}
              endTime={value.endTime}
              duration={value.duration}
              availableSeats={value.availableSeats}
              activityBooking={value.ActivityBooking}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        </PlaceTable>
      </TableWrapper>
      <TableWrapper>
        <TableTitle>Sala de Workshop</TableTitle>
        <PlaceTable>
          {workshopActivities.map((value, index) => (
            <ActivityWrapper
              key={index}
              id={value.id}
              title={value.title}
              startTime={value.startTime}
              endTime={value.endTime}
              duration={value.duration}
              availableSeats={value.availableSeats}
              activityBooking={value.ActivityBooking}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        </PlaceTable>
      </TableWrapper>
    </Container>
  );
}

const Container = styled.section`
  margin-top: 61px;
  display: flex;
`;

const TableWrapper = styled.div`
  width: 288px;
`;

const PlaceTable = styled.div`
  margin-top: 13px;
  width: 100%;
  height: 391px;
  border: 1px solid #d7d7d7;
  border-left: ${({ isFirst }) => (isFirst ? '1px solid #d7d7d7' : 0)};
  padding: 10px 9px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const TableTitle = styled.h5`
  font-family: 'Roboto';
  font-size: 17px;
  text-align: center;
  color: #7b7b7b;
`;
