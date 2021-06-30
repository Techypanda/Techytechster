import axios from "axios"
import { useQuery } from "react-query"

async function fetchBlogpage(pageKey: string | undefined) {
  const payload = {
    NextPage: pageKey,
    PageCount: 5
  }
  return await axios.post("https://api.techytechster.com/blog/all", payload)
}
export function useBlog(pageKey: string | undefined, pageNumber: number) {
  return useQuery(["blog", pageNumber], async () => {
    console.log('reached')
    return await fetchBlogpage(pageKey)
  }, { staleTime: Number.MAX_VALUE })
}