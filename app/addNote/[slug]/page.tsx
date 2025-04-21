import React from 'react'
import { FormType, AddNote } from './AddNote'
import { FormEvent } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { TokenResponse } from '../../actions/actions'
import { getToken } from '../../actions/actions'
import { Note } from '../../inventory/columns';
type Props = {
  id: string
}

const page = async ({ params }: { params: { slug: string } }) => {

  const getPost = async (data: string): Promise<Note | undefined> => {
    try {
      console.log('get postss')
      const tokenResponse = await getToken()
      if (tokenResponse) {
        const response = await fetch(`http://localhost:8080/api/posts/getPost?id=${data}`, {
          method: 'GET',
          cache: "no-store",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.token}`
          },
        })
        console.log(data)
        return await response.json()
      }
    }
    catch (error) {
      console.log(error)
    }
  }

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