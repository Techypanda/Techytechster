import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from "@material-ui/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BlogDeletePromptProps } from "../../interface";

function BlogDeletePrompt(props: BlogDeletePromptProps) {
  const history = useHistory();
  const client = useQueryClient();
  async function handleDelete() {
    const DeletePayload = {
      Title: props.blogTitle
    }
    axios.post("https://api.techytechster.com/blog/delete", DeletePayload, {
      headers: {
        authorization: await client.getQueryData("token")
      }
    }).then((resp: AxiosResponse) => {
      client.removeQueries("blog");
      alert(resp.data);
      history.push("/blog");
    }).catch(async (error: AxiosError) => {
      if (error.response?.status === 401) {
        await client.refetchQueries('token');
        axios.post("https://api.techytechster.com/blog/delete", DeletePayload, {
          headers: {
            authorization: await client.getQueryData("token")
          }
        }).then((resp: AxiosResponse) => {
          client.removeQueries("blog");
          alert(resp.data);
          history.push("/blog");
        }).catch(async (error: AxiosError) => {
          if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/"
          } else {
            alert(error.response?.data);
            props.setOpen(false);
          }
        })
      } else {
        alert(error.response?.data);
        props.setOpen(false);
      }
    })
  }
  return (
    <Box>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="deleteprompt-title"
        aria-describedby="deleteprompt-text"
      >
        <DialogTitle id="deleteprompt-title">{`Are you sure you want to delete post '${props.blogTitle}'?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="deleteprompt-text">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDelete()} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default styled(BlogDeletePrompt)`
`;