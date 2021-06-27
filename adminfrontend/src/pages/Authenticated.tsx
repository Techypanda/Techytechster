import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import useCognitoToken from "../api/cognito";
import { DefaultProps } from "../interface";
import AuthHome from './AuthHome';
import Blog from "./Blog";
import NotFound from "./NotFound";
import Projects from "./Projects";

function Authenticated(props: DefaultProps) {
  useCognitoToken();
  return (
    <Switch>
      <Route exact path="/">
        <AuthHome />
      </Route>
      <Route path="/projects">
        <Projects />
      </Route>
      <Route path="/blog">
        <Blog />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default styled(Authenticated)`
`;