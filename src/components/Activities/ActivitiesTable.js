import styled from 'styled-components';

export default function ActivitiesTable({ dateActivities }) {
  return (
    <Container>
      <TableWrapper>
        <TableTitle>Auditório Principal</TableTitle>
        <PlaceTable isFirst={true}></PlaceTable>
      </TableWrapper>
      <TableWrapper>
        <TableTitle>Auditório Lateral</TableTitle>
        <PlaceTable></PlaceTable>
      </TableWrapper>
      <TableWrapper>
        <TableTitle>Sala de Workshop</TableTitle>
        <PlaceTable></PlaceTable>
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
`;

const TableTitle = styled.h5`
  font-family: 'Roboto';
  font-size: 17px;
  text-align: center;
  color: #7b7b7b;
`;
