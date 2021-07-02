import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DefaultProps, Page } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";
import BlogNav from "./BlogNav";
import { useBlog } from "../../api/blog";
import { useState } from "react";
import BlogList from "./BlogList";
import BlogPageNav from "./BlogPageNav";
import SyncLoader from "react-spinners/SyncLoader";

function BlogHome(props: DefaultProps) {
  const history = useHistory();
  const [page, setPage] = useState<Page>({ pageNo: 0, pageKey: undefined });
  const [prevPageKeys, setPrevPageKeys] = useState<Map<number, string | undefined>>(new Map())
  const { isLoading, data } = useBlog(page);

  function nextPage() {
    if ((page.pageNo + 1) < data?.data.PageCount) {
      const deepCopy = prevPageKeys;
      deepCopy.set(page.pageNo, page.pageKey);
      setPrevPageKeys(deepCopy);
      setPage({ pageNo: page.pageNo + 1, pageKey: data?.data.NextPage })
    }
  }
  function prevPage() {
    if ((page.pageNo - 1) > -1) {
      setPage({ pageNo: page.pageNo - 1, pageKey: prevPageKeys.get(page.pageNo) })
    }
  }

  return (
    <Box className={props.className}>
      <BlogNav location="Home" />
      <Box mt={1} mb={2}>
        <WindowsBtn onClick={() => history.push('/blog/create')} variant="h5" component="h4" px={2}>Create A Blog</WindowsBtn>
      </Box>
      { !isLoading && <BlogList Posts={data?.data.Posts} />}
      { !isLoading && <BlogPageNav pageCount={data?.data.PageCount} nextPage={nextPage} prevPage={prevPage} />}
      <Box position="absolute" height="100vh" width="100vw" top={0} left={0} display={isLoading ? "block" : "none"} className="loadingbg">
        <SyncLoader color="rgb(187,187,187)" loading={isLoading} size={50} />
      </Box>
    </Box>
  )
}

export default styled(BlogHome)`
.loadingbg {
  z-index: 999;
  background-color: rgba(0,0,132, 0.25);
}
.loadingbg .css-1xdhyk6 {
  z-index: 9999;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50vh;
  left: 50vw;
}
`;