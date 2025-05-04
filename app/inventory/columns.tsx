"use client"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { deletePost } from "../actions/actions"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Note = {
  id: number | null
  title: string
  content: string
  email: string
  description: string
  imageUrl: string
}

export const getColumns = (email: string, onClick: (id: string) => void): ColumnDef<Note>[] => [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const email = row.getValue("email");
      return (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px' // Adjust the width as needed
        }}>
          {email as string}
        </div>
      );
    }
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title");
      return (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px' // Adjust the width as needed
        }}>
          {title as string}
        </div>
      );
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description");
      return (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px' // Adjust the width as needed
        }}>
          {description as string}
        </div>
      );
    }
  },
  {

    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      return (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px' // Adjust the width as needed
        }}
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </div>
      );
    }
  },
  {

    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("imageUrl");
      const isValidImage =
        typeof image === "string" &&
        (image.startsWith("/") || image.startsWith("http://") || image.startsWith("https://"));

      console.log(image)
      return (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px',

        }} >
          {image as string}
          {isValidImage ? (
            <Image src={image} alt="" width={500}
              height={150}
              className="object-cover"></Image>
          ) : (
            <span className="text-xs text-muted-foreground">Invalid image</span>
          )}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const note = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onClick('/viewNote/' + note.id)}>View note</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onClick('/addNote/' + -1)}>Add note</DropdownMenuItem>
            {note.email === email && (
              <>
                <DropdownMenuItem onClick={() => onClick('/addNote/' + note.id)}>Edit note</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  if (note.id) {
                    console.log("deletePost")
                    deletePost(note.id?.toString() ?? "");
                  }
                  else {
                    console.log("deletePost failed")
                  }

                }}
                >Delete note</DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem
              onClick={() => console.log(note.title)}
            >
              Copy note ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu >
      )
    },
  },
]