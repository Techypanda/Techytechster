import { DefaultProps } from "../../interface";
import { Container, Typography, Box, Grid } from "@material-ui/core";
import Title from "./Title";
import Subtitle from "./Subtitle";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
const Technology = [
  "Azure",
  "AWS",
  "IBM Cloud",
  "React",
  "VueJS",
  "Svelte",
  "Rails",
  "Golang",
  "Ruby",
  ".NET",
  "Elastic",
  "New Relic",
  "GitHub"
]
function shuffleArray(array: Array<string>) {
  let arr = [...array];
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
let intervalStatus = true;
const TabletSubtitle = styled(Subtitle)`
h2 {
  font-size: 2.125rem;
}
`;

function TabletView(props: DefaultProps) {
  const [tech, setTech] = useState([...Technology]);
  const history = useHistory();
  useEffect(() => {
    setInterval(() => {
      if (intervalStatus) {
        setTech(shuffleArray(Technology))
      }
    }, 1000);
  }, []);
  function updateShuffle(state: boolean) {
    if (state) {
      intervalStatus = true;
    } else {
      intervalStatus = false;
    }
  }
  return (
    <div className={props.className}>
      <Box className={`bluescreen`} height="100vh" width="100vw" alignItems="center" display="flex">
        <Container>
          <Box>
            <Title />
            <TabletSubtitle />
            <Typography variant="h6" component="h4" className="windowsfont" align="center">"I try to do fun things on the cloud and develop good software"</Typography>
          </Box>
          <Box paddingTop={4} onMouseEnter={() => updateShuffle(false)} onMouseLeave={() => updateShuffle(true)}>
            <Grid container spacing={2} justify="center">
              <Grid item className="bigtext">
                I &lt;3
              </Grid>
              <Grid item className="bigtext">
                -
            </Grid>
              <Grid item className="bigtext">
                {tech[0]}
              </Grid>
              <Grid item className="bigtext">
                {tech[1]}
              </Grid>
              <Grid item className="bigtext">
                {tech[2]}
              </Grid>
              <Grid item className="bigtext">
                {tech[3]}
              </Grid>
              <Grid item className="bigtext">
                {tech[4]}
              </Grid>
              <Grid item className="bigtext">
                {tech[5]}
              </Grid>
              <Grid item className="bigtext">
                {tech[6]}
              </Grid>
              <Grid item className="bigtext">
                {tech[7]}
              </Grid>
              <Grid item className="bigtext">
                {tech[8]}
              </Grid>
              <Grid item className="bigtext">
                {tech[9]}
              </Grid>
              <Grid item className="bigtext">
                {tech[10]}
              </Grid>
              <Grid item className="bigtext">
                {tech[11]}
              </Grid>
              <Grid item className="bigtext">
                {tech[12]}
              </Grid>
            </Grid>
          </Box>
          <Box paddingTop={8}>
            <Typography variant="h4" component="h2" className="windowsfont" align="center">View My</Typography>
            <Box paddingTop={1}>
              <Grid container spacing={3} justify="center">
                {/* <Grid item xs={2}>
                  <div className="windowsbtn" onClick={() => history.push('/projects')}>Projects</div>
                </Grid> */}
                <Grid item xs={2}>
                  <div className="windowsbtn" onClick={() => history.push('/resume')}>Resume</div>
                </Grid>
                {/* <Grid item xs={2}>
                  <div className="windowsbtn" onClick={() => history.push('/blog')}>Blog</div>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default styled(TabletView)`
.bluescreen {
  background-color: #000084 !important;
  color: #bbb;
  font-family: 'more_perfect_dos_vgaregular', 'Courier New', monospace !important;
}
.windowsbtn {
  background-color: #bbb !important;
  color: #000084;
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
}
.windowsfont {
  font-family: 'more_perfect_dos_vgaregular', 'Courier New', monospace !important;
}
.bigtext {
  font-size: 24px;
}
`;