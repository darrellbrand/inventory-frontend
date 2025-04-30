import React from 'react'
import { AddNote } from './AddNote'
import { getPost} from '../../actions/actions'
import { FileUploader } from '@/components/FileUpload'



type Props = {
  params: { slug: string }
}

const page = async ({ params }: { params: { slug: string } }) => {
 // To capture query params
  const {slug} = await params;
  let note
  if (Number(slug) > -1) {
    note = await getPost(slug) ?? { title: "", content: "", email: "", id: null, description: "",  imageUrl: "" }
  }
  else {
    note = { title: "", content: "", email: "", id: null, description: "", imageUrl: "" }
  }
  return (
<div>
    <AddNote note={note}></AddNote>
    </div>
  )
}
export default page