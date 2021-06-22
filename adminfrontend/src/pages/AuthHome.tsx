import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import Modules from "../components/AuthHome/Modules";
import { DefaultProps } from "../interface";

function AuthHome(props: DefaultProps) {

  return (
    <Box className={props.className}>
      <Box minHeight="100vh" className="bluebg" pt={2}>
        <Typography align="center" variant="h4" component="h1" className="windowsfont">Techytechster Admin</Typography>
        <Box mt={3}>
          <Modules />
        </Box>
      </Box>
    </Box>
  )
}

export default styled(AuthHome)`
.bluebg {
  background-color: rgb(0, 0, 132) !important;
}
.windowsfont {
  color: rgb(187, 187, 187);
  font-family: more_perfect_dos_vgaregular !important;
}
`;