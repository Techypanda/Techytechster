import { Box } from "@material-ui/core";
import styled from "styled-components";
import useCognitoToken from "../api/cognito";
import { DefaultProps } from "../interface";

function Authenticated(props: DefaultProps) {
  useCognitoToken();
  return (
    <Box className={props.className}>
      Authenticated...
    </Box>
  )
}

export default styled(Authenticated)`
`;