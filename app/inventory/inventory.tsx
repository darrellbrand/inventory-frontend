
'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Note, columns } from "./columns"
import { DataTable } from "./data-table"


export default function ({ note }: { note: Note[] }) {

    const [notedata, setNoteData] = useState<Note[] | null>(null);

    useEffect(() => {
        console.log('enter useeffect !!!!')
        
            const getTokenCookie = async () => {
                const response = await fetch('http://localhost:3000/api/getToken', {
                    credentials: 'include',
                    cache: 'no-store',
                    method: 'GET',
                });
                console.log('!!!!')
                const data = await response.json();
                console.log(data)
                if (data) {
                    console.log('inventory got token')
                    console.log(data)
                }
                else {
                    console.log('inventory  failed to get token')

                }
                const postResponse = await fetch('http://localhost:8080/api/posts/findAll', {
                    cache: "no-store",
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',

                });
                if (!postResponse.ok) {
                    console.error('response status', response.status)
                }
                const ret = await postResponse.json()
                return ret
            }
            try{getTokenCookie()}
            catch(error){
                console.error('error',error)
            }
            
    }, [])
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={notedata ?? []} />
        </div>
    )
};

