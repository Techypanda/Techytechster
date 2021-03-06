import { Box, Grid } from "@material-ui/core";
import styled from "styled-components";
import { DefaultProps } from "../../interface";
import { Document, Page } from 'react-pdf';
// @ts-ignore
import ResumePDF from "../../assets/Jonathan_Wright_CV.pdf";
import { useHistory } from "react-router-dom";

function ResumeTabletView(props: DefaultProps) {
  const history = useHistory();
  return (
    <Box className={props.className}>
      <Box display="flex" justifyContent="center" height="100vh" alignItems="center">
        <Box>
          <Box p={1} className="uglywindow">
            <Box>
              <Grid container className="uglynavbar" justify='flex-end'>
                <Grid item>
                  <div onClick={() => history.push('/')} className="uglybtn">_</div>
                </Grid>
                <Grid item>
                  <div onClick={() => history.push('/')} className="uglybtn">+</div>
                </Grid>
                <Grid item>
                  <div onClick={() => history.push('/')} className="uglybtn">X</div>
                </Grid>
              </Grid>
            </Box>
            <Document file={ResumePDF} options={{ workerSrc: "pdf.worker.js" }}>
              <Page pageNumber={1} height={800} />
            </Document>
          </Box>
          <Box marginTop={2}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={4}>
                <div className="windowsbtn" onClick={() => history.push('/')}>Home</div>
              </Grid>
              <Grid item xs={4}>
                <div className="windowsbtn" onClick={() => window.location.href = `${window.location.origin}/Jonathan_Wright_CV.pdf`}>Open Externally</div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default styled(ResumeTabletView)`
.uglywindow {
  background-color: #bbb !important;
  box-shadow: inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5);
}
.uglynavbar {
  background-color: #000084;
}
.uglybtn {
  margin: 5px;
  padding: 1px 5px;
  background-color: #bbb !important;
  box-shadow: inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5);
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
     -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none;
  color: #000;
}
.windowsbtn {
  background-color: #bbb !important;
  color: #000084;
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
  font-family: 'more_perfect_dos_vgaregular', 'Courier New', monospace !important;
}
`;