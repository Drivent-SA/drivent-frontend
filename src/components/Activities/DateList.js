import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useState } from 'react';
import styled from 'styled-components';
import DateActivities from './DateActivities';

export default function DateList({ activities }) {
  const [showTable, setShowTable] = useState({ date: '', isShown: false });

  dayjs.extend(updateLocale);
  dayjs.updateLocale('pt-br', {
    weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  });

  const dates = [];
  activities !== null &&
    activities.forEach((value) => {
      if (dates.includes(value.date) === false) {
        dates.push(value.date);
      }
    });

  return (
    <>
      <Subtitle>Primeiro, filtre pelo dia do evento:</Subtitle>
      <ButtonContainer>
        {dates.map((date, index) => (
          <DateActivities
            key={index}
            date={dayjs(date).locale('pt-br').format('dddd, DD/MM')}
            showTable={showTable}
            setShowTable={setShowTable}
          />
        ))}
      </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 17px;
`;
