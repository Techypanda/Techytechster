import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { WindowsBtnProps } from "../../interface";

function WindowsBtn(props: WindowsBtnProps) {

  return (
    <div className={props.className} onClick={props.onClick !== undefined ? () => props.onClick!() : undefined} onMouseDown={props.onMouseDown !== undefined ? () => props.onMouseDown! : undefined}>
      <Box display="inline-block" className="windowsbtn" px={props.px ? props.px : 0} py={props.py ? props.py : 0}>
        <Typography
          variant={props.variant ? props.variant : "h4"}
          component={props.component ? props.component : "h3"}
          className="windowsbtnfont"
          display="inline"
        >{props.children}</Typography>
      </Box>
    </div>
  )
}
export default styled(WindowsBtn)`
.windowsbtn {
  background-color: rgb(187, 187, 187) !important;
  cursor: pointer;
}
.windowsbtnfont {
  color: rgb(0,0,132) !important;
  font-family: more_perfect_dos_vgaregular !important;
}
`;