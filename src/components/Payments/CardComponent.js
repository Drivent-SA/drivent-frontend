import React, { useState } from 'react';
import styled from 'styled-components';
import useSavePayment from '../../hooks/api/useSavePayment';

import Results from './Results';

function CardComponent({ ticketId }) {
  const [forms, setForms] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [isFrontOfCardVisible, setIsFrontOfCardVisible] = useState(true);

  function toggleCardFlip() {
    setIsFrontOfCardVisible(!isFrontOfCardVisible);
  }

  function handleForm(e) {
    setForms({ ...forms, [e.target.name]: e.target.value });
  }
  const { savePayment } = useSavePayment();
  async function submitForms() {
    try {
      if (forms.cardNumber.length === 16 && forms.name.length > 3 && forms.expiry.length === 4 && forms.cvc.length === 3) {
        const cardData = {
          issuer: 'visa',
          number: forms.cardNumber,
          name: forms.name,
          expirationDate: `${forms.expiry[0]}${forms.expiry[1]}/${forms.expiry[2]}${forms.expiry[3]}`,
          cvv: forms.cvc
        };

        await savePayment({ ticketId, cardData });
      }
    } catch (error) {

    }
  }

  return (
    <Container>

      <Results data={forms} isFrontOfCardVisible={isFrontOfCardVisible} setIsFrontOfCardVisible={setIsFrontOfCardVisible}/>

      <FormsContainer>
        <InputStyle
          type="text"
          name='cardNumber'
          placeholder='Card Number'
          value={forms.cardNumber}
          onChange={handleForm}
          maxLength="16"
        />
        <InputStyle
          type="text"
          name='name'
          placeholder='Name'
          value={forms.name}
          onChange={handleForm}
        />
        <SubContainer>
          <InputStyle
            type="number"
            name='expiry'
            placeholder='Valid Thru'
            max="5"
            value={forms.expiry}
            onChange={handleForm}
            style={ (forms.expiry > 1250 ? ({ border: '2px solid red' }):({}))}
          />
          <InputStyle
            type="number"
            name='cvc'
            placeholder='CVC'
            value={forms.cvc}
            onChange={handleForm}
            onFocus={toggleCardFlip}
            onBlur={toggleCardFlip}
            style={ (forms.cvc.length > 3 ? ({ border: '2px solid red' }):({}))}
          />
        </SubContainer>
        
      </FormsContainer>

      <ButtonSubmit onClick={() => submitForms() }>FINALIZAR PAGAMENTO</ButtonSubmit>

    </Container>
  );
}

const Container = styled.div`
    display:grid;
    grid-template-columns: 1fr 1.9fr;
    row-gap:15%;
    column-gap:5%;
`;
const FormsContainer = styled.form`
    display:grid;
    width:90%;
    grid-template-columns: 1fr;
    align-items:center;
`;
const SubContainer= styled.div`
    display:grid;
    grid-template-columns: 3fr 2fr;
    column-gap: 5%;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
`;
const InputStyle = styled.input`
    height: 40px;
    width:100%;
    border: 2px solid lightgray;
    margin-top: 13px;
    font-family: 'Roboto';
    font-size: 20px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.5);
    padding-left: 20px;
    outline: none;
    background: white;
    border-radius: 8px;
    :focus{
        border: 2px solid #7c7c7c;
    }
`;
const ButtonSubmit = styled.div`
    cursor: pointer;
    width: 182px;
    height: 37px;
    background-color: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    font-size: 14px;
    color: #000000;
    font-family: 'Roboto';
    display: flex;
    align-items:center;
    justify-content: center;
`;

export default CardComponent;
