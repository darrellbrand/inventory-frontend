import React from 'react'
import { FormType, AddNote } from './AddNote'
import { FormEvent } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { getPost, fetchToken, } from '../../actions/actions'


type Props = {
  id: string
}

const page = async ({ params }: { params: { slug: string } }) => {
  const token = await fetchToken()


  let note
  if (Number(params.slug) > -1 && token) {
    note = await getPost(params.slug, token) ?? { title: "", content: "", email: "", id: null, description: "" }
  }
  else {
    note = { title: "", content: "", email: "", id: null, description: "" }
  }
  return (

    <AddNote note={note}></AddNote>
  )
}
export default page