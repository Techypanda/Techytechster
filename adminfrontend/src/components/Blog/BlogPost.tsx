import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { usePost } from "../../api/blog";
import { DefaultProps } from "../../interface";
import NotFound from "../../pages/NotFound";

function BlogPost(props: DefaultProps) {
  const history = useHistory();
  const { data, isLoading, isError } = usePost(window.location.pathname.split("/")[3], history)

  if (isLoading) {
    return (
      <Box className={props.className}>
        LOADING - {isError}
      </Box>
    )
  } else if (data) {
    return <Box className={props.className}>
      asdfas
    </Box>
  } else {
    return <div className={props.className}><NotFound /></div>
  }
}
export default styled(BlogPost)`
`;