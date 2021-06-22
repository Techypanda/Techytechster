import { Grid, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DefaultProps } from "../../interface";

function Modules(props: DefaultProps) {
  const history = useHistory();
  return (
    <div className={props.className}>
      <Grid container justify="center">
        <Grid item sm={3}>
          <Box p={1} className="moduleitem" onClick={() => history.push("/blog")}>
            <Typography variant="h5" component="h2" className="windowsfont" align="center">Blog</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default styled(Modules)`
.moduleitem {
  background-color: rgb(187, 187, 187) !important;
  cursor: pointer;
}
.windowsfont {
  color: rgb(0, 0, 132) !important;
  font-family: more_perfect_dos_vgaregular !important;
}
`;