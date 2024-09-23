
import { cookies } from "next/headers";
import Inventory from './inventory';
import { Note } from './columns'
import { getToken } from '../home/actions'
export default async function page() {

  const notes: Note[] = [
    {
        id: 1,
        title: "Meeting Notes",
        content: "Discussed the project timeline and deliverables.",
        email: "user1@example.com",
    },
    {
        id: 2,
        title: "Grocery List",
        content: "Milk, Eggs, Bread, Butter.",
        email: "user2@example.com",
    },
    {
        id: 3,
        title: "Vacation Plans",
        content: "Book flights and hotels for the trip to Hawaii.",
        email: "user3@example.com",
    },
];

  //await fetchPosts()
  return (
    <Inventory note={notes}></Inventory>
  )
};



