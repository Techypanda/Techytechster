import { Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DefaultProps } from "../interface";

function NotFound(props: DefaultProps) {
  const history = useHistory();
  return (
    <Box className={`${props.className}`} onClick={() => history.push("/")} onKeyPress={() => history.push("/")}>
      <div className="ntofouncontainer">
        <div className="notfound">
          <div className="centered"><span className="inverted">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;</div>
          <div className="centered"><span className="inverted">&nbsp;4&nbsp;0&nbsp;4&nbsp;</span><span className="shadow">&nbsp;</span></div>
          <div className="centered"><span className="inverted">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="shadow">&nbsp;</span></div>
          <div className="centered">&nbsp;<span className="shadow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          <div className="row">&nbsp;</div>
          <div className="row">A fatal exception 404 has occurred at C0DE:ABAD1DEA in 0xC0DEBA5E.</div>
          <div className="row">The current request will be terminated.</div>
          <div className="row">&nbsp;</div>
          <div className="row">* Press any key to return to the previous page.</div>
          <div className="row">* Press CTRL+ALT+DEL to restart your computer. You will</div>
          <div className="row">&nbsp;&nbsp;lose any unsaved information in all applications.</div>
          <div className="row">&nbsp;</div>
          <div className="centered">Press any key to continue...<span className="blink">&#9608;</span></div>
          <Box marginTop={2}>
            <Typography variant="h6" component="h6">Credit to: <a href="https://codepen.io/agalliat/pen/mdedZYK" className="link">Angela Galliat</a></Typography>
          </Box>
        </div>
      </div>
    </Box>
  )
}
export default styled(NotFound)`
.ntofouncontainer {
  background-color: #000084;
  color: #bbb;
  font-family: 'more_perfect_dos_vgaregular', 'Courier New', monospace;
  font-size: 10px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  color: #CC0000;
}
@media (min-width: 600px) {
  .ntofouncontainer {
      font-size: 16px;
  }
}

@media (min-width: 900px) {
  .ntofouncontainer {
      font-size: 24px;
      font-weight: 400;
  }
}

.notfound {
  width: 70ch;
  height: 25ch;
  background-color: #000084;
}

.row {
  text-align: left;
}

.centered {
  text-align: center;
}

.inverted {
  background-color: #bbb;
  color: #000084;
}

.shadow {
  background-color: #000;
  color: #000084;
}

.blink {
  animation: blinkingText .8s infinite;
}

@keyframes blinkingText {
  0% {
      opacity: 0;
  }
  
  49% {
      opacity: 0;
  }
  
  50% {
      opacity: 1;
  }
}

`;