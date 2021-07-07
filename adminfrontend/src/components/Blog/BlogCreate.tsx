import { Box, TextField } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { CreateProps } from "../../interface";
import WindowsBtn from "../shared/WindowsBtn";
import WindowsRichText from "../shared/WindowsRichText";
import BlogNav from "./BlogNav";
import { useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { useHistory } from "react-router-dom";


function BlogCreate(props: CreateProps) {
  const history = useHistory();
  const client = useQueryClient();
  const [blogTitle, setBlogTitle] = useState(props.update ? props.oldtitle : "");
  const [blogContent, setBlogContent] = useState(props.update ? props.oldcontent : "");
  const [loading, setLoading] = useState(false);
  async function createBlog() {
    const CreateBlogPayload = {
      title: blogTitle,
      content: blogContent,
      author: await client.getQueryData("username")
    }
    if (!CreateBlogPayload.title) {
      alert("Missing Blog Title");
    } else if (!CreateBlogPayload.content) {
      alert("Missing Blog Content");
    } else {
      setLoading(true);
      if (props.update) {
        const UpdateBlogPayload = {
          newtitle: blogTitle,
          newcontent: blogContent,
          newauthor: await client.getQueryData("username"),
          oldtitle: props.oldtitle,
          oldcontent: props.oldcontent,
          oldauthor: props.oldauthor
        }
        axios.post("https://api.techytechster.com/blog/update", UpdateBlogPayload, {
          headers: {
            authorization: await client.getQueryData("token")
          }
        }).then((resp: AxiosResponse) => {
          alert(resp.data)
          client.removeQueries("blog")
          setLoading(false);
          history.push("/blog");
        }).catch(async (err: AxiosError) => {
          if (err.response?.status === 401) {
            await client.refetchQueries("token")
            axios.post("https://api.techytechster.com/blog/update", CreateBlogPayload, {
              headers: {
                authorization: await client.getQueryData("token")
              }
            }).then((resp: AxiosResponse) => {
              alert(resp.data);
              client.removeQueries("blog")
              setLoading(false);
              history.push("/blog");
            }).catch(async (err: AxiosError) => {
              if (err.response?.status === 401) {
                localStorage.clear();
                window.location.href = "/";
              } else {
                alert(err.response?.data)
                setLoading(false);
              }
            })
          } else {
            alert(err.response?.data)
            setLoading(false);
          }
        })
      } else {
        axios.post("https://api.techytechster.com/blog/create", CreateBlogPayload, {
          headers: {
            authorization: await client.getQueryData("token")
          }
        }).then((resp: AxiosResponse) => {
          alert(resp.data)
          client.removeQueries("blog")
          setLoading(false);
          history.push("/blog");
        }).catch(async (err: AxiosError) => {
          if (err.response?.status === 401) {
            await client.refetchQueries("token")
            axios.post("https://api.techytechster.com/blog/create", CreateBlogPayload, {
              headers: {
                authorization: await client.getQueryData("token")
              }
            }).then((resp: AxiosResponse) => {
              alert(resp.data);
              client.removeQueries("blog")
              setLoading(false);
              history.push("/blog");
            }).catch(async (err: AxiosError) => {
              if (err.response?.status === 401) {
                localStorage.clear();
                window.location.href = "/";
              } else {
                alert(err.response?.data)
                setLoading(false);
              }
            })
          } else {
            alert(err.response?.data)
            setLoading(false);
          }
        })
      }
    }
  }

  return (
    <Box className={props.className}>
      <BlogNav location="Create" />
      <Box mt={2}>
        <TextField id="blog-title-input" label="Blog Title" variant="filled" className="windowsinput" fullWidth onChange={(e) => setBlogTitle(e.target.value)} value={blogTitle} />
      </Box>
      <WindowsRichText initialState={props.oldcontent} onChange={(content: string) => setBlogContent(content)} />
      <Box mt={2}>
        <WindowsBtn px={2} variant="h5" component="h4" onClick={() => createBlog()}>Create</WindowsBtn>
      </Box>
      <Box position="absolute" height="100vh" width="100vw" top={0} left={0} display={loading ? "block" : "none"} className="loadingbg">
        <SyncLoader color="rgb(187,187,187)" loading={loading} size={50} />
      </Box>
    </Box>
  )
}

export default styled(BlogCreate)`
.windowsinput {
  background-color: rgb(187,187,187) !important;
  color: rgb(0,0,132) !important;
  font-family: more_perfect_dos_vgaregular !important;
}
#blog-title-input {
  font-family: more_perfect_dos_vgaregular !important;
}
.MuiFormLabel-root {
  color: rgb(0,0,132) !important;
  font-family: more_perfect_dos_vgaregular !important;
}
.windowsfont {
  color: rgb(187, 187, 187);
  font-family: more_perfect_dos_vgaregular !important;
}
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