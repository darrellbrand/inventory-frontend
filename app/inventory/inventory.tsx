
'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Note, getColumns } from "./columns"
import { DataTable } from "./data-table"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export type InventoryProps = {
    notes: Note[] | undefined
}

export default function Inventory(props: InventoryProps) {
    const [notedata, setNoteData] = useState<Note[] | null | undefined>(props.notes);
    const router = useRouter();
    const pushNote = (route: string) => {
        router.push(route)
    }
    useEffect(() => {
        setNoteData(props.notes)
    }, [props.notes])
    const { data: session, status } = useSession()
    console.log("Session: ", session, "Status:", status);
    return (
        <div className='relative h-full  w-full  overflow-x-hidden justify-center items-center flex flex-col bg-background'>
            <div className='max-w-xs md:max-w-7xl w-full h-full mt-44 '>
                <DataTable columns={getColumns(session?.user?.email ? session?.user?.email : "", pushNote)} data={notedata ?? []} />
            </div>
        </div>
    )
};

