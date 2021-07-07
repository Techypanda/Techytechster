import { Box } from "@material-ui/core";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { DefaultProps } from "../interface";
// {process.env.REACT_APP_LOGIN}{window.location.origin}
function Unauthenticated(props: DefaultProps) {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.get('code')) {
    window.location.replace(`${process.env.REACT_APP_LOGIN}${window.location.origin}`)
  } else {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.REACT_APP_COGNITO_CLIENT_ID!)
    params.append('code', urlParams.get('code')!);
    params.append('redirect_uri', window.location.origin);
    axios.post(`${process.env.REACT_APP_COGNITO_LOGIN_URI}/oauth2/token`, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((resp) => {
      localStorage.setItem('rToken', resp.data['refresh_token']);
      localStorage.setItem('rTokenExpiry', new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000)).toString()); // After 60 days the refresh token no longer works
      window.location.replace('/')
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 400) {
        if (err.response.data['error'] === 'invalid_grant') {
          window.location.replace(`${process.env.REACT_APP_COGNITO_LOGIN_URI}/login?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&response_type=code&scope=email+openid+phone+profile&redirect_uri=${window.location.origin}`);
        }
        console.error(err.response); // need to add a error screen
      }
      console.error(err.response); // need to add a error screen
    })
  }
  return (
    <Box className={props.className}>
      Performing Authentication...
    </Box>
  )
}

export default styled(Unauthenticated)`
`;