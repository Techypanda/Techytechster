import { Box, Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import BlogHome from "../components/Blog/BlogHome";
import { DefaultProps } from "../interface";
import NotFound from "./NotFound";

function Blog(props: DefaultProps) {

  return (
    <Box className={props.className}>
      <Box className="bluebg" minHeight="100vh">
        <Container>
          <Switch>
            <Route exact path="/blog">
              <BlogHome />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Container>
      </Box>
    </Box>
  )
}

export default styled(Blog)`
.bluebg {
  background-color: rgb(0, 0, 132) !important;
}
`;