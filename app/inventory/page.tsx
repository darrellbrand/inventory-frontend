
import { cookies } from "next/headers";
import Inventory from './inventory';
import { Note } from './columns'
import { getToken } from '../home/actions'
export default async function page() {

  //await fetchPosts()
  return (
    <Inventory></Inventory>
  )
};



