import React from 'react'
import ViewNote from './ViewNote'
import { getPost } from '../../actions/actions'
type Props = {}




const page = async ({ params }: { params: { slug: string } }) => {
  
    const id = params.slug
    const post =  await getPost(id) ?? { title: "Default Title", content: "", email: "", description: "" ,id: 0 }
    console.log(post)
  return (
   <ViewNote params={{note: post}}></ViewNote>
  )
}

export default page