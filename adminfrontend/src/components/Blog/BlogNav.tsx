import { Box, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BlogNavProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";

function BlogNav(props: BlogNavProps) {
  const history = useHistory();
  return (
    <Box className={props.className}>
      <Grid container>
        <Grid item sm={6}>
          <Typography variant="h4" component="h1" className="windowsfont">Blog Administration - {props.location}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Box display="flex" justifyContent="flex-end">
            <Box mr={2}>
              {!(window.location.href === `${window.location.origin}/blog`) && <WindowsBtn px={2} onClick={() => history.push('/blog')}>Blog - Home</WindowsBtn>}
            </Box>
            <Box>
              <WindowsBtn px={2} onClick={() => history.push('/')}>Modules</WindowsBtn>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default styled(BlogNav)`
.windowsfont {
  color: rgb(187, 187, 187);
  font-family: more_perfect_dos_vgaregular !important;
}
`;