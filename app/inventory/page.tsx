
import { cookies } from "next/headers";
import Inventory, { InventoryProps } from './inventory';
import { Note } from './columns'
import { getToken } from '../actions/actions'
export default async function page() {

  const getAllPosts = async () => {
    try {
      const data = await getToken()
      if (data) {
        const postResponse = await fetch('http://localhost:8080/api/posts/findAll', {
          cache: "no-store",
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
          },
          credentials: 'include',
        });
        if (!postResponse.ok) {
          console.error('response status', postResponse.status)
        }
        const ret = await postResponse.json() as Note[]
        console.log(ret)
        return ret
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  const notes = await getAllPosts()
  //await fetchPosts()
  return (
    <Inventory notes={notes}  >
    </Inventory>
  )
};



