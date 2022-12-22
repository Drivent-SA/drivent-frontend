import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';

function PaymentsSucccess() {
  return (
    <>
      <Container>

        <ContainerIcon><CheckIcon/></ContainerIcon>
        
        <LeftContainer>
          <Title>Pagamento confirmado!</Title>
          <SubTitle>Prossiga para escolha de hospedagem e atividades</SubTitle>
        </LeftContainer>

      </Container>
    </>
  );
}

const Container = styled.div`
    width: 100%;
    display:grid;
    grid-template-columns:0.5fr 8fr; 
    column-gap:1%;
`;
const LeftContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content:center;
`;
const Title = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
`;
const SubTitle = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
`;
const ContainerIcon = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const CheckIcon = styled(AiFillCheckCircle)`
    color:#36B853;
    font-size:42px;
`;
export default PaymentsSucccess;
