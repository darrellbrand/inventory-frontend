

import { Note, columns } from "../../inventory/columns"
const viewNote = ({ params }: { params: { note: Note } }) => {
  const note = params.note
  return (
    <div className="flex items-center mx-auto justify-center mt-64  max-w-64">
    <div className="w-full grid gap-4 grid-cols-2">
        <h1>Title</h1>
        <h1>{note.title}</h1>
        <h1>Content</h1>
        <h1>{note.content}</h1>
        <h1>Description</h1>
        <h1>{note.description}</h1>
        <h1>Email</h1>
        <h1>{note.email}</h1>
    </div>
    </div>

  )
}

export default viewNote