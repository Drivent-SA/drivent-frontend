import React from 'react';
import Cards from 'react-credit-cards-2';
import styled from 'styled-components';
import 'react-credit-cards-2/es/styles-compiled.css';

function Results({ data, isFrontOfCardVisible, setIsFrontOfCardVisible, forms, setForms }) {
  function toggleCardFlip() {
    setIsFrontOfCardVisible(!isFrontOfCardVisible);
  }
  function handleCallback({ issuer }, isValid) {
    if (isValid) {
      setForms({ ...forms, issuer });
    } 
  }

  return (
    <>
      <Container onClick={toggleCardFlip}>
        <Cards
          cvc={data.cvc || ''}
          expiry={data.expiry || ''}
          name={data.name || ''}
          number={data.cardNumber || ''}
          focused={isFrontOfCardVisible ? 'number' : 'cvc'}
          callback={handleCallback}
        />
      </Container>
    </>
  );
}

const Container = styled.div`
    width: 100%;
`;

export default Results;
