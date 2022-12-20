import React, { useState } from 'react';
import styled from 'styled-components';
import Cards from 'react-credit-cards-2';
import Results from './Results';

function CardComponent() {
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

  function submitForms() {
    try {
        
    } catch (error) {
    //TODO avisar erro
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
        <SubContainer className="expiry-and-cvc-container mt-3">
          <InputStyle
            type="text"
            name='expiry'
            placeholder='Valid Thru'
            value={forms.expiry}
            onChange={handleForm}
          />
          <InputStyle
            type="text"
            name='cvc'
            placeholder='CVC'
            value={forms.cvc}
            maxLength="3"
            onChange={handleForm}
            onFocus={toggleCardFlip}
            onBlur={toggleCardFlip}
          />
        </SubContainer>
        <div onClick={() => console.log(forms) }>Submit</div>
      </FormsContainer>

    </Container>
  );
}

const Container = styled.div`
    display:grid;
    grid-template-columns: 1fr 1.9fr;
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

export default CardComponent;
