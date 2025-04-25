
'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Note, columns } from "./columns"
import { DataTable } from "./data-table"
import { TokenResponse } from '../actions/actions';
import { getToken } from '../actions/actions';
import { useSession } from "next-auth/react"
import { DivideCircle } from 'lucide-react';
export type InventoryProps = {
    notes: Note[] | undefined
}
export default function (props: InventoryProps) {
    const { data: session, status } = useSession()
    const [notedata, setNoteData] = useState<Note[] | null | undefined>(props.notes);
    useEffect(() => {
        setNoteData(props.notes)
    }, [props.notes])

    return (
        <div className='relative h-full w-screen justify-center items-center flex flex-col bg-background'>
            <div className='max-w-xs md:max-w-7xl w-full '>
                <DataTable columns={columns} data={notedata ?? []} />
            </div>
        </div>
    )
};

