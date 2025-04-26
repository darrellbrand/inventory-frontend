
import { cookies } from "next/headers";
import Inventory, { InventoryProps } from './inventory';
import { Note } from './columns'
import { getAllPosts, fetchToken,  } from '../actions/actions'
export default async function page() {

  const token = await fetchToken()
  const notes = await getAllPosts(token)
 

  //await fetchPosts()
  return (
    <Inventory notes={notes}  >
    </Inventory>
  )
};



