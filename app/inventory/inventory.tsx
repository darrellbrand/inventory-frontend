
'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Note, columns } from "./columns"
import { DataTable } from "./data-table"
import { TokenResponse } from '../actions/actions';
import { getToken } from '../actions/actions';
import { useSession } from "next-auth/react"
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
        <div className="container mx-auto max-w-7xl mt-20">
            <DataTable columns={columns} data={notedata ?? []} />
        </div>
    )
};

