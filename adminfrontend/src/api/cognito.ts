import { useQuery } from "react-query";
import axios from "axios";

const getToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', process.env.REACT_APP_COGNITO_CLIENT_ID!)
  params.append('refresh_token', localStorage.getItem('rToken')!);
  try {
    const resp = await axios.post(`${process.env.REACT_APP_COGNITO_LOGIN_URI}/oauth2/token`, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    let idToken: string = resp.data['id_token'];
    return idToken;
  } catch {
    localStorage.removeItem("rToken");
    localStorage.removeItem('rTokenExpiry');
    window.location.href = "/";
    return new Error();
  }
}

export default function useCognitoToken() {
  return useQuery("token", async () => {
    return await getToken()
  }, { refetchInterval: 1600000, staleTime: 1600000 }); // after 28 minutes begin trying to get a new token
}