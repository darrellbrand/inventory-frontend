
import { cookies } from "next/headers";
import Inventory from './inventory';
import { Note } from './columns'
import { getToken } from '../actions/actions'
export default async function page() {

  //await fetchPosts()
  return (
    <Inventory></Inventory>
  )
};



