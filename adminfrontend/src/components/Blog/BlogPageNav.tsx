import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { BlogPageNavProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";

function BlogPageNav(props: BlogPageNavProps) {
  const boxes = []
  for (let i = 0; i < props.pageCount; i++) {
    boxes.push(<WindowsBtn key={i} mr={2} px={1}><Typography variant="subtitle1" component="p" className="windowsfont">{i + 1}</Typography></WindowsBtn>)
  }
  return (
    <div className={props.className}>
      <Box display="flex">
        {boxes}
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <WindowsBtn px={2} mr={2} onClick={() => props.prevPage()}>
          <Typography variant="h6" component="h6" className="windowsfont">Previous</Typography>
        </WindowsBtn>
        <WindowsBtn px={2} onClick={() => props.nextPage()}>
          <Typography variant="h6" component="p" className="windowsfont">Next</Typography>
        </WindowsBtn>
      </Box>
    </div>
  )
}
export default styled(BlogPageNav)`
#windowsfont {
  font-family: more_perfect_dos_vgaregular !important;
}
.windowsfont {
  font-family: more_perfect_dos_vgaregular !important;
}
`;