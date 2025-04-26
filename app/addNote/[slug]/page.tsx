import React from 'react'
import { AddNote } from './AddNote'
import { getPost} from '../../actions/actions'


type Props = {
  id: string
}

const page = async ({ params }: { params: { slug: string } }) => {
  
  let note
  if (Number(params.slug) > -1) {
    note = await getPost(params.slug) ?? { title: "", content: "", email: "", id: null, description: "" }
  }
  else {
    note = { title: "", content: "", email: "", id: null, description: "" }
  }
  return (

    <AddNote note={note}></AddNote>
  )
}
export default page