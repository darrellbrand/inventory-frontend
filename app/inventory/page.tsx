
import Inventory from './inventory';
import { getAllPosts } from '../actions/actions'
export default async function page() {

  const notes = await getAllPosts()
  return (
    <Inventory notes={notes}  >
    </Inventory>
  )
};



