import Page from '../components/Page';
import { StyledContainer } from '../components/Auth';

export default function AuthLayout({ background, children }) {
  return (
    <Page background={background}>
      <StyledContainer width="400px" min-height="520px">
        {children}
      </StyledContainer>
    </Page>
  );
}
