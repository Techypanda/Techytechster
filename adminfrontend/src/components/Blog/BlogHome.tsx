import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DefaultProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";
import BlogNav from "./BlogNav";
import { useBlog } from "../../api/blog";
import { useState } from "react";
import BlogList from "./BlogList";
import BlogPageNav from "./BlogPageNav";

function BlogHome(props: DefaultProps) {
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [latestKey, setKey] = useState<string | undefined>(undefined);
  const { isLoading, data } = useBlog(latestKey, page);
  
  return (
    <Box className={props.className}>
      <BlogNav location="Home" />
      <Box mt={1} mb={2}>
        <WindowsBtn onClick={() => history.push('/blog/create')} variant="h5" component="h4" px={2}>Create A Blog</WindowsBtn>
      </Box>
      { !isLoading && <BlogList Posts={data?.data.Posts} /> }
      { !isLoading && <BlogPageNav pageCount={data?.data.PageCount} changePage={() => console.log("pain")} /> }
    </Box>
  )
}

export default styled(BlogHome)`
`;