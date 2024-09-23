
'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Note, columns } from "./columns"
import { DataTable } from "./data-table"


export default function ({ note }: { note: Note[] }) {

    const [notedata, setNoteData] = useState<Note[] | null>(null);
    
    useEffect(() => {

        const getTokenCookie = async () => {
            const response = await fetch('http://localhost:3000/api/getToken', {
                credentials: 'include',
                cache: 'no-store',
                method: 'GET',
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
            } else {
                console.error(data.error);
            }

            if (data) {
                console.log('inventory got token')
                console.log(data)
            }
            else {
                console.log('inventory  failed to get token')

            }

        }
        getTokenCookie()
    }),[];










    /*   console.log('fetch posts')
       try {
           const response = await fetch('http://localhost:8080/api/posts/findAll', {
               cache: "no-store",
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json'
               },
               credentials: 'include',
   
           });
           if (!response.ok) {
               console.error('response status', response.status)
           }
           const ret = await response.json
           console.log(response)
           console.log(response.status)
           return ret
       } catch (error) {
           console.error('Error:', error);
       }
   */



    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={notedata ?? []} />
        </div>
    )
}

