
import Image from "next/image"
import { Note } from "../../inventory/columns"
const ViewNote = ({ params }: { params: { note: Note } }) => {
  const note = params.note
  const isValidImage =
    typeof note.imageUrl === "string" &&
    (note.imageUrl.startsWith("/") || note.imageUrl.startsWith("http://") || note.imageUrl.startsWith("https://"));
  return (
    <div className="w-screen h-screen flex flex-col items-center  justify-center bg-background  ">
      <div className="w-full grid gap-4 grid-cols-2  max-w-5xl mx-auto">
        <h1>Title</h1>
        <h1>{note.title}</h1>
        <h1>Content</h1>
        <h1 dangerouslySetInnerHTML={{__html : note.content}}></h1>
        <h1>Description</h1>
        <h1>{note.description}</h1>
        <h1>Email</h1>
        <h1>{note.email}</h1>

        {isValidImage ? (
          <>
            <h1>Image</h1>
            <Image src={note.imageUrl} alt="invalid image"></Image>
          </>
        ) : (<></>)}

      </div>
    </div>

  )
}

export default ViewNote