import axios from "axios"
import { useQuery } from "react-query"
import { Page } from "../interface"

async function fetchBlogpage(pageKey: string | undefined) {
  const payload = {
    NextPage: pageKey,
    PageCount: 5
  }
  return await axios.post("https://api.techytechster.com/blog/all", payload)
}

async function fetchBlogPost(title: string, history: any) {
  try {
    const resp = await axios.get(`https://api.techytechster.com/blog/${title}`)
    return resp;
  } catch {
    history.push("/notfound")
  }
}
export function usePost(title: string, history: any) {
  return useQuery(`blogpost-${title}`, async () => {
    return await fetchBlogPost(title, history)
  }, { staleTime: Number.MAX_VALUE })
}
export function useBlog(page: Page) {
  return useQuery(["blog", page.pageNo], async () => {
    return await fetchBlogpage(page.pageKey)
  }, { staleTime: Number.MAX_VALUE })
}