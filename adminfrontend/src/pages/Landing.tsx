import { DefaultProps } from "../interface";
import styled from 'styled-components';
import { Container, Typography } from "@material-ui/core";
import Unauthenticated from "./Unauthenticated";
import { useQueryClient } from "react-query";
function Landing(props: DefaultProps) {
  const client = useQueryClient();
  function TokenExpired() {
    if (localStorage.getItem('rToken') && localStorage.getItem('rTokenExpiry')) {
      try {
        return !(new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)) < new Date(localStorage.getItem('rTokenExpiry')!)); // if theres atleast 2 days left on token were ok
      } catch {
        localStorage.removeItem('rToken');
        localStorage.removeItem('rTokenExpiry');
        return true;
      }
    }
    return true;
  }
  
  return (
    <Container>
      { TokenExpired() &&  <Unauthenticated /> }
    </Container>
  )
}
export default styled(Landing)`
`;