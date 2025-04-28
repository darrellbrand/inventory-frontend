

import { Note, columns } from "../../inventory/columns"
const viewNote = ({ params }: { params: { note: Note } }) => {
  const note = params.note
  return (
    <div className="w-screen h-screen flex flex-col items-center  justify-center bg-background  ">
      <div className="w-full grid gap-4 grid-cols-2  max-w-5xl mx-auto">
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