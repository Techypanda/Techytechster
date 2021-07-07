import { Grid, Box, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DefaultProps } from "../../interface";

function Modules(props: DefaultProps) {
  const history = useHistory();
  return (
    <div className={props.className}>
      <Container>
        <Grid container justify="center" spacing={3}>
          <Grid item sm={4}>
            <Box p={0.5} className="moduleitem" onClick={() => history.push("/blog")}>
              <Typography variant="h5" component="h2" className="windowsfont" align="center">Blog</Typography>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box p={0.5} className="moduleitem" onClick={() => history.push("/projects")}>
              <Typography variant="h5" component="h2" className="windowsfont" align="center">Projects</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
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