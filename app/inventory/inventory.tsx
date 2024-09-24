
'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Note, columns } from "./columns"
import { DataTable } from "./data-table"
import { TokenResponse } from '../home/actions';
import { getToken } from '../home/actions';

export default function ({ note }: { note: Note[] }) {

    const [notedata, setNoteData] = useState<Note[] | null>(null);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const data = await getToken()
                if (data) {
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
                        console.error('response status', postResponse.status)
                    }
                    const ret = await postResponse.json() as Note[]
                    console.log(ret)
                    setNoteData(ret)
                    return ret
                }
            }
            catch (error) {
                console.error(error)
            }
        }
        const notes = getAllPosts()

    }, [])
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={notedata ?? []} />
        </div>
    )
};

