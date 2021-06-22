import { Box } from "@material-ui/core";
import styled from "styled-components";
import { DefaultProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";
import BlogNav from "./BlogNav";

function BlogHome(props: DefaultProps) {

  return (
    <Box className={props.className}>
      <BlogNav location="Home" />
      <Box mt={1}>
        <WindowsBtn onClick={() => console.log('do something')} variant="h5" component="h4" px={2}>Create A Blog</WindowsBtn>
      </Box>
    </Box>
  )
}

export default styled(BlogHome)`
.windowsfont {
  color: rgb(187, 187, 187);
  font-family: more_perfect_dos_vgaregular !important;
}
`;