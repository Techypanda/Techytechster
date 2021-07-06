import { Box, Container, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { usePost } from "../../api/blog";
import { DefaultProps } from "../../interface";
import NotFound from "../../pages/NotFound";
import SyncLoader from "react-spinners/SyncLoader";
import { useState } from "react";
import BlogNav from "./BlogNav";
import WindowsBtn from "../shared/WindowsBtn";

function BlogPost(props: DefaultProps) {
  const history = useHistory();
  const [loading] = useState(false);
  const { data, isLoading } = usePost(window.location.pathname.split("/")[3], history)

  if (isLoading) {
    return (
      <Box className={props.className}>
        <Box position="absolute" height="100vh" width="100vw" top={0} left={0} display={loading ? "block" : "none"} className="loadingbg">
          <SyncLoader color="rgb(187,187,187)" loading={loading} size={50} />
        </Box>
      </Box>
    )
  } else if (data) {
    return (
      <Box className={props.className}>
        <Box mb={2}>
          <Container maxWidth="xl" className="nopaddingfix">
            <BlogNav location="Post View" />
          </Container>
        </Box>
        <Container className="graybg">
          <Box py={3}>
            <Box>
              <Typography variant="h4" component="h2" className="msblue redirect" onClick={() => history.push(`/blog/view/${data.data.Title}`)}>{data.data.Title}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" component="h2" className="msblue redirect" onClick={() => history.push(`/blog/view/${data.data.Title}`)}>Written by {data.data.Author} on {(new Date(Number.parseInt(data.data.Date) / 1000000.0)).toString()}</Typography>
            </Box>
            <Box mt={2}>
              <div id="content" dangerouslySetInnerHTML={{ __html: data.data.Content }} />
            </Box>
          </Box>
        </Container>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item>
              <WindowsBtn variant="h5" px={2} onClick={() => console.log("Deleting post")}>Delete</WindowsBtn>
            </Grid>
            <Grid item>
              <WindowsBtn variant="h5" px={2} onClick={() => console.log("Editing post")}>Edit</WindowsBtn>
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  } else {
    return <div className={props.className}><NotFound /></div>
  }
}
export default styled(BlogPost)`
.nopaddingfix {
  padding: 0 !important;
}
.loadingbg {
  z-index: 999;
  background-color: rgba(0,0,132, 0.25);
}
.loadingbg .css-1xdhyk6 {
  z-index: 9999;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50vh;
  left: 50vw;
}
.graybg {
  background-color: rgb(187,187,187) !important;
}
* {
  font-family: more_perfect_dos_vgaregular !important;
}
.msblue {
  color: rgb(0,0,132) !important;
}
.redirect {
  cursor: pointer;
  display: inline;
}
#content p {
  margin: 0 !important;
}
#content h1 {
  margin: 0 !important;
}
#content h2 {
  margin: 0 !important;
}
#content h3 {
  margin: 0 !important;
}
#content h4 {
  margin: 0 !important;
}
#content h5 {
  margin: 0 !important;
}
#content h6 {
  margin: 0 !important;
}
#content figure {
  margin: 0;
}
#content {
  max-height: 200px;
  overflow: hidden;
}
`;