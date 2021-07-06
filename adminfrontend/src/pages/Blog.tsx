import { Box, Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import BlogCreate from "../components/Blog/BlogCreate";
import BlogHome from "../components/Blog/BlogHome";
import BlogPost from "../components/Blog/BlogPost";
import { DefaultProps } from "../interface";

function Blog(props: DefaultProps) {

  return (
    <Box className={props.className}>
      <Box className="bluebg" minHeight="100vh">
        <Container>
          <Switch>
            <Route exact path="/blog">
              <BlogHome />
            </Route>
            <Route exact path="/blog/create">
              <BlogCreate />
            </Route>
            <Route>
              <BlogPost />
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