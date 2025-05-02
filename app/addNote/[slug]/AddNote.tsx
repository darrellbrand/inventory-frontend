'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { FormItem, FormControl, FormField, FormLabel, FormDescription, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Note } from '../../inventory/columns';
import { authenticator, getToken } from '@/app/actions/actions';
import { FileUploader } from '@/components/FileUpload';
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Editor styles
import 'froala-editor/css/froala_style.min.css'; // Content styles
import 'froala-editor/css/plugins/markdown.min.css'; // 
import 'froala-editor/css/themes/dark.min.css';
import 'froala-editor/css/themes/royal.min.css'
import 'froala-editor/css/themes/gray.min.css'
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useSession } from "next-auth/react"

const FroalaEditorComponent = dynamic(async () => {

  const { default: FroalaEditor } = await import("react-froala-wysiwyg");
  if (typeof window !== 'undefined') {
    await Promise.all([import('froala-editor/js/froala_editor.pkgd.min.js'),
    await import('froala-editor/js/plugins/markdown.min.js')
    ]
    )
  }
  return FroalaEditor;
}, {
  loading: () => <p>LOADING!!!</p>,
  ssr: false,  // Disable SSR for Froala editor to avoid issues with server-side rendering
});
const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(2).max(5000),
  description: z.string().min(2).max(1000),
})
export type FormType = z.infer<typeof formSchema>

type Props = {
  note: Note
}

const getOptions = (theme: string) => ( {
  toolbarButtons: ['bold', 'italic', 'underline', 'alignRight', 'alignCenter', 'alignLeft', 'outdent', 'indent', 'undo', 'redo', 'clearFormatting', 'markdown', 'selectAll'],
  pluginsEnabled: ['align', 'charCounter', 'markdown'],
  charCounterMax: 5000,
  markDown: true,
  theme: theme
})

export const AddNote = (props: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const note = props.note;
  const { theme } = useTheme()
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onChange", //
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',  // Ensure the content is initialized
      description: note?.description || '',
    },
  })

  const [isEditorReady, setEditorReady] = useState(false);
  const { handleSubmit, control } = form;
  const [imageFile, setImageFile] = useState<File | Blob | string | null>();

  useEffect(() => {
    setEditorReady(true)
  }, [theme])




  const handleUpload = async (files: File[]) => {
    // Extract the first file from the file input
    const file = files[0];
    setImageFile(file);
    // Retrieve authentication parameters for the upload.

  };


  const doImageUpload = async (): Promise<string | undefined> => {
    const file = imageFile;
    if (!file) {
      console.log("no file end function")
      return;
    }
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }

    const abortController = new AbortController();

    const { signature, expire, token, publicKey } = authParams;
    console.log(authParams)
    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file instanceof File ? file.name : 'uploaded_file',
        // Progress callback to update upload progress state
        onProgress: (event) => {
          console.log((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      console.log("Upload response:", uploadResponse);
      return uploadResponse.url;
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  }



  const savePost = async (data: FormType): Promise<FormType | undefined> => {
    
    
    console.log("savePost")
    try {
      console.log({ data })
      const imageUrl = await doImageUpload();
      if (!note) {
        console.error("Note is null or undefined.");
        return;  // Optionally return early or handle the case when note is not available
      }
      note.content = data.content
      note.title = data.title
      note.email = session?.user?.email ? session.user.email : ""
      note.description = data.description
      if (imageUrl) {
        note.imageUrl = imageUrl
      }
      const tokenResponse = await getToken()
      if (tokenResponse) {
        const response = await fetch('https://general-server-zwpu.onrender.com/api/posts/save', {
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
        return await response.json()
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' relative flex flex-col w-screen h-screen  justify-center items-center  overflow-x-hidden bg-background pb-16' >
      <Form {...form}>
        <form onSubmit={handleSubmit(savePost)} className=" w-full max-w-2xl px-2 mt-32 ">
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
          {isEditorReady && (
            <FormField
              name="content"
              rules={{ required: true }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormItem className='mt-5'>
                  <FormLabel>Content</FormLabel>
                  <div className='froala-wrapper'>
                    <FroalaEditorComponent
                    key={theme}
                      model={field.value}
                      onModelChange={field.onChange}
                      config={getOptions(theme || 'system')}
                    />
                  </div>
                  <FormDescription>
                    This is rich text editor for your markup content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>)}></FormField>
          )}
          <div className='relative flex w-full  flex-col justify-center  items-center mt-5'>
            <FileUploader onUploadAction={handleUpload}></FileUploader>
            <Button className="max-w-xs w-full  mt-4" type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

