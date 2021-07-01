import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { BlogPageNavProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";

function BlogPageNav(props: BlogPageNavProps) {
  const boxes = []
  for (let i = 0; i < props.pageCount; i++) {
    boxes.push(<WindowsBtn px={1}><Typography variant="subtitle1" component="p" className="windowsfont">{i + 1}</Typography></WindowsBtn>)
  }
  return (
    <Box className={props.className}>
      {boxes}
    </Box>
  )
}
export default styled(BlogPageNav)`
.windowsfont {
  font-family: more_perfect_dos_vgaregular !important;
}
`;