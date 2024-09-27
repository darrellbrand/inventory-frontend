"use client"
import { useRouter } from 'next/navigation'
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Note = {
  id: number | null
  title: string
  content: string
  email: string
  description: string
}

export const columns: ColumnDef<Note>[] = [
  {
   
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const content = row.getValue("content");
      return (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px' // Adjust the width as needed
        }}>
          {content as string}
        </div>
      );
    }
  },
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
    id: "actions",
    cell: ({ row }) => {
      const note = row.original
      const router = useRouter()
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
            <DropdownMenuItem
              onClick={() => console.log(note.title)}
            >
              Copy note ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={ () => router.push('/viewNote/' + note.id)}>View note</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={ () => router.push('/addNote/' + note.id)}>Edit note</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]