import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { decode } from "jsonwebtoken";

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
    const token = await getToken()
    return token;
  }, { refetchInterval: 1600000, staleTime: 1600000 }); // after 28 minutes begin trying to get a new token
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function useUsername(client: QueryClient) {
  return useQuery("username", async () => {
    let token = client.getQueryData("token") as string | null
    while (!token) {
      await sleep(1000);
      token = client.getQueryData("token") as string | null
    }
    const username = (decode(token) as any)["cognito:username"] as string
    return username
  }, { refetchInterval: 1600000, staleTime: 1600000 }); // after 28 minutes begin trying to get a new token
}