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
export function useBlog(page: Page) {
  return useQuery(["blog", page.pageNo], async () => {
    return await fetchBlogpage(page.pageKey)
  }, { staleTime: Number.MAX_VALUE })
}