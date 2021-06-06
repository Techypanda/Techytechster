import { Box, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DefaultProps } from "../interface";

function Projects(props: DefaultProps) {
  const history = useHistory();
  return (
    <Box className={props.className}>
      <Grid container>
        <div className="windowsbtn" onClick={() => { if (window.location.href !== `${window.location.origin}/projects`) { history.push('/projects') }}}>
          <Typography variant="h5" component="h2">Projects</Typography>
        </div>
        <Box marginLeft={0.25}>
          <div className="windowsbtn" onClick={() => history.push('/')}>
            <Typography variant="h5" component="h2">Home</Typography>
          </div>
        </Box>
      </Grid>
    </Box>
  )
}

export default styled(Projects)`
* {
  font-family: 'more_perfect_dos_vgaregular', 'Courier New', monospace !important;
}
.windowsbtn {
  background-color: #bbb !important;
  color: #000084;
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
     -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none;
}
`;