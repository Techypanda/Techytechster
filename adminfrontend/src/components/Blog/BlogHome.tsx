import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { DefaultProps } from "../../interface";
import BlogNav from "./BlogNav";

function BlogHome(props: DefaultProps) {

  return (
    <Box className={props.className}>
      <BlogNav location="Home" />
    </Box>
  )
}

export default styled(BlogHome)`
.windowsfont {
  color: rgb(187, 187, 187);
  font-family: more_perfect_dos_vgaregular !important;
}
`;