import styled from 'styled-components';

export default function ErrorMessageWrapper({ children }) {
  return (
    <Wrapper>
      <Paragraph>{children}</Paragraph>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 72px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Paragraph = styled.p`
  font-family: 'Roboto', sans-serif;
  text-align: center;
  max-width: 465px;
  font-size: 20px;
  color: #8e8e8e;
`;
