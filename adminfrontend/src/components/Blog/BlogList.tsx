import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { BlogListProps } from "../../interface";
import BlogPreview from "./BlogPreview";

function BlogList(props: BlogListProps) {
  if (props.Posts.length > 0) {
    return (
      <Box className={props.className}>
        {props.Posts.map((post, i) =>
          <Box mb={2} key={i}>
            <BlogPreview blog={post} />
          </Box>
        )}
      </Box>
    )
  } else {
    return (
      <Box className={props.className}>
        <Typography className="windowsfont">There is no posts to display</Typography>
      </Box>
    )
  }
}
export default styled(BlogList)`
.windowsfont {
  color: rgb(187, 187, 187);
  font-family: more_perfect_dos_vgaregular !important;
}
`;