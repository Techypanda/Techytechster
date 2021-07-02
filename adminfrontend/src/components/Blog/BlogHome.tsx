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
import { useQueryClient } from "react-query";
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function BlogHome(props: DefaultProps) {
  const history = useHistory();
  const client = useQueryClient();
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
    </Box>
  )
}

export default styled(BlogHome)`
`;