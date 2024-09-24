'use client'
import React from 'react'
import { useForm ,SubmitHandler} from "react-hook-form"
import { FormItem, FormControl, FormField, FormLabel, FormDescription, FormMessage, Form, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { getToken } from '../api/getToken'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Textarea } from "@/components/ui/textarea"
const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  description: z.string().min(2).max(1000)
})
export type FormType = z.infer<typeof formSchema>


type Props = {}


export const AddNote = (props: Props) => {
  const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      email: "",
      description: "",
    },
  })
  const savePost = async (data: FormType): Promise<FormType | undefined> => {
    try {
  
      const tokenResponse = await getToken()
      if (tokenResponse) {
        const response = await fetch('http://localhost:8080/api/posts/save', {
          method: 'POST',
          cache: "no-store",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.token}`
          },
        })
        console.log(data)
        router.push("/inventory")
        return await response.json()
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='  my-6   mx-64  ' >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(savePost)} className="space-y-8">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

