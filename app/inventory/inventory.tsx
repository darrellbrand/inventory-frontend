
'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Note, columns } from "./columns"
import { DataTable } from "./data-table"
import { TokenResponse } from '../home/actions';


export default function ({ note }: { note: Note[] }) {

    const [notedata, setNoteData] = useState<Note[] | null>(null);

    useEffect(() => {
            const getTokenCookie = async ()  => {
                const response = await fetch('http://localhost:3000/api/getToken', {
                    credentials: 'include',
                    cache: 'no-store',
                    method: 'GET',
                });
                const data = await response.json() as TokenResponse;
                console.log(data.token)
                if (data) {
                    console.log('inventory got token')
                    console.log(data)
                }
                else {
                    console.log('inventory  failed to get token')

                }
                console.log(data)
                const postResponse = await fetch('http://localhost:8080/api/posts/findAll', {
                    cache: "no-store",
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.token}`
                    },
                    credentials: 'include',
                });
                if (!postResponse.ok) {
                    console.error('response status', response.status)
                }
                const ret = await postResponse.json() as Note[]
                console.log(ret)
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

