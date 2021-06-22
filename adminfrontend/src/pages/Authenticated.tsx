import { Box, Typography } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import useCognitoToken from "../api/cognito";
import { DefaultProps } from "../interface";
import AuthHome from './AuthHome';
import NotFound from "./NotFound";

function Authenticated(props: DefaultProps) {
  useCognitoToken();
  return (
    <Switch>
      <Route exact path="/">
        <AuthHome />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default styled(Authenticated)`
`;