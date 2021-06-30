import { Box } from "@material-ui/core";
import styled from "styled-components";
import { BlogPageNavProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";

function BlogPageNav(props: BlogPageNavProps) {
  const boxes = []
  for (let i = 0; i < props.pageCount; i++) {
    boxes.push(<WindowsBtn>{i}</WindowsBtn>)
  }
  return (
    <Box className={props.className}>
      {boxes}
    </Box>
  )
}
export default styled(BlogPageNav)`
`;