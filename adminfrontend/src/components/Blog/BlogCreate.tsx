import { Box, TextField } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { DefaultProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";
import WindowsRichText from "../shared/WindowsRichText";
import BlogNav from "./BlogNav";

function BlogCreate(props: DefaultProps) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  function createBlog() {
    const newBlog = {
      blogTitle,
      blogContent
    }
    if (!newBlog.blogTitle) {
      alert("Missing Blog Title");
    } else if (!newBlog.blogContent) {
      alert("Missing Blog Content");
    } else {
      console.log(newBlog);
    }
  }
  return (
    <Box className={props.className}>
      <BlogNav location="Create" />
      <Box mt={2}>
        <TextField id="blog-title-input" label="Blog Title" variant="filled" className="windowsinput" fullWidth onChange={(e) => setBlogTitle(e.target.value)} value={blogTitle} />
      </Box>
      <WindowsRichText onChange={(content: string) => setBlogContent(content)} />
      <Box mt={2}>
        <WindowsBtn px={2} variant="h5" component="h4" onClick={() => createBlog()}>Create</WindowsBtn>
      </Box>
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