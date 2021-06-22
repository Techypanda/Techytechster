import { Box, TextField } from "@material-ui/core";
import styled from "styled-components";
import { DefaultProps } from "../../interface";
import WindowsRichText from "../shared/WindowsRichText";
import BlogNav from "./BlogNav";

function BlogCreate(props: DefaultProps) {

  return (
    <Box className={props.className}>
      <BlogNav location="Create" />
      <Box mt={2}>
        <TextField id="blog-title-input" label="Blog Title" variant="filled" className="windowsinput" fullWidth />
      </Box>
      <WindowsRichText />
    </Box>
  )
}

export default styled(BlogCreate)`
.windowsinput {
  background-color: rgb(187,187,187) !important;
  color: rgb(0,0,132) !important;
  font-family: more_perfect_dos_vgaregular !important;
}
#blog-title-input {
  font-family: more_perfect_dos_vgaregular !important;
}
.MuiFormLabel-root {
  color: rgb(0,0,132) !important;
  font-family: more_perfect_dos_vgaregular !important;
}
.windowsfont {
  color: rgb(187, 187, 187);
  font-family: more_perfect_dos_vgaregular !important;
}
`;