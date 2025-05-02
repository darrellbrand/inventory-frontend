import React from 'react'
import ViewNote from './ViewNote'
import { getPost} from '../../actions/actions'

const page = async (props: { params: Promise<{ slug: string }> }) => {
 const params = await props.params;
 const id = params.slug
 const post =  (await getPost(id)) ?? { title: "Default Title", content: "", email: "", description: "" ,id: 0, imageUrl: "" }
 console.log(post)
 return (
  <ViewNote params={{note: post}}></ViewNote>
 )
}

export default page