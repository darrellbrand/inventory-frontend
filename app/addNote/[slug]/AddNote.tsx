'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import { FormItem, FormControl, FormField, FormLabel, FormDescription, FormMessage, Form, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"
import { Note } from '../../inventory/columns';
import { revalidatePath } from 'next/cache';
import { getToken } from '@/app/actions/actions';
const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  description: z.string().min(2).max(1000)
})
export type FormType = z.infer<typeof formSchema>


type Props = {
  note: Note
}





export const AddNote = (props: Props) => {
  const router = useRouter()
  const note = props.note
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note.title ?? "",
      content: note.content ?? "",
      email: note.content ?? "",
      description: note.description ?? "",
    },
  })
  const savePost = async (data: FormType): Promise<FormType | undefined> => {
    try {
      note.content = data.content
      note.title = data.title
      note.description = data.description
      note.email = data.email
      const tokenResponse = await getToken()
      if (tokenResponse) {
        const response = await fetch('http://localhost:8080/api/posts/save', {
          method: 'POST',
          cache: "no-store",
          body: JSON.stringify(note),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.token}`
          },
        })
        console.log(data)
        router.push("/inventory")
        revalidatePath("/inventory", "page")
        return await response.json()
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=' relative flex flex-col w-screen min-h-screen  justify-center items-center  overflow-hidden ' >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(savePost)} className=" w-full max-w-2xl px-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="post title" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of the post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  This is a description of the post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="post content" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of the post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="posters email address" {...field} />
                </FormControl>
                <FormDescription>
                  This is the posters email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='relative flex w-full h-28  flex-col justify-center  items-center'>
          <Button className="max-w-xs w-full  mt-4" type="submit">Submit</Button>
          </div>
        </form>

      </Form>

    </div>
  )
}

