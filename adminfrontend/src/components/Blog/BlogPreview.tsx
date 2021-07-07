import { Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BlogPrviewProps } from "../../interface";
import WindowsRichPreviewer from "../shared/WindowsRichPreviewer";

function BlogPreview(props: BlogPrviewProps) {
  const history = useHistory();
  return (
    <Box className={props.className}>
      <Box className="graybg" p={1.5}>
        <Box>
          <Typography variant="h5" component="h2" className="msblue redirect" onClick={() => history.push(`/blog/view/${props.blog.BlogTitle}`)}>{props.blog.BlogTitle}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" component="h2" className="msblue redirect" onClick={() => history.push(`/blog/view/${props.blog.BlogTitle}`)}>Written by {props.blog.Author} on {(new Date(Number.parseInt(props.blog.Date) / 1000000.0)).toString()}</Typography>
        </Box>
        <Box mt={2}>
          <div id="content">
            <WindowsRichPreviewer initialState={atob(props.blog.Content)} />
          </div>
        </Box>
      </Box>
    </Box>
  )
}
export default styled(BlogPreview)`
#content {
  max-height: 200px;
  overflow: hidden;
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
`;