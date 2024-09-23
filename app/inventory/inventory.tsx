
'use client'
import React from 'react'
import { useState } from 'react';
import { Note, columns } from "./columns"
import { DataTable } from "./data-table"


export default  function ({note} : {note :Note[]}) {

    const [notedata, setNoteData] = useState<Note[] | null>(null);
   
    return (
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={notedata ?? []} />
    </div>
    )
}

