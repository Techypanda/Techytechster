import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { DefaultProps } from "../../interface";

function Typed(props: DefaultProps) {
  return (
    <Box display="flex" justifyContent="center" className={props.className}>
      <Typography variant="h3" component="h2" className={`windowsfont typewriter ${props.className}`} align="center">Fullstack Developer &amp; Cloud Architect</Typography>
    </Box>
  )
}

export default styled(Typed)`
.typewriter {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  
  animation-name: blinking, typing;
  animation-duration: 0.5s, 5s;
  animation-timing-function: linear, steps(37);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes blinking {
  from {
    border-right: 0 solid transparent;
  }
  
  to {
    border-right: 1px solid transparent;
  }
}

@keyframes typing {
  80%, 100% {
    width: calc(37 * 1ch);
  }
}
`