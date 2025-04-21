import React from 'react'
import ViewNote from './ViewNote'
import { z } from "zod"
import { getToken } from '../../actions/actions'
import { useRouter } from 'next/router'
import { Note, columns } from "../../inventory/columns"
type Props = {}

const getPost = async (data: string): Promise<Note | undefined> => {
  try {
    console.log(data)
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



const page = async ({ params }: { params: { slug: string } }) => {
  
    const id = params.slug
    const post =  await getPost(id) ?? { title: "Default Title", content: "", email: "", description: "" ,id: 0 }
    console.log(post)
  return (
   <ViewNote params={{note: post}}></ViewNote>
  )
}

export default page