import { DefaultProps } from "../interface";
import styled from 'styled-components';
import { Container, Typography } from "@material-ui/core";
function Landing(props: DefaultProps) {
  return (
    <Container>
      <Typography>Landing</Typography>
      {process.env.REACT_APP_LOGIN}{window.location.href}
    </Container>
  )
}
export default styled(Landing)`
`;