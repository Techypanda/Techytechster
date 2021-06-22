import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DefaultProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";
import BlogNav from "./BlogNav";

function BlogHome(props: DefaultProps) {
  const history = useHistory();
  return (
    <Box className={props.className}>
      <BlogNav location="Home" />
      <Box mt={1}>
        <WindowsBtn onClick={() => history.push('/blog/create')} variant="h5" component="h4" px={2}>Create A Blog</WindowsBtn>
      </Box>
    </Box>
  )
}

export default styled(BlogHome)`
`;