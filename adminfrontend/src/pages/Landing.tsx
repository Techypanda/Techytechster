import { DefaultProps } from "../interface";
import styled from 'styled-components';
import Unauthenticated from "./Unauthenticated";
import Authenticated from "./Authenticated";
function Landing(props: DefaultProps) {
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
    <>
      { TokenExpired() &&  <Unauthenticated /> }
      { !TokenExpired() && <Authenticated /> }
    </>
  )
}
export default styled(Landing)`
`;