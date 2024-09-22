
'use client'
import React from 'react'
import { useState } from 'react';
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import Container from "./container"
export type PaymentData = {
    payment : Payment[] 
}
export default async function () {

    const [data, setData] = useState(null);
    const [notedata, setNoteData] = useState<Payment[] | null>(null);
    const username = 'dj';
    const password = 'password';
    const authString = btoa(`${username}:${password}`);
   
    async function getData(): Promise<Payment[]> {
        // Fetch data from your API here.
        return [
            {
                id: "728ed52f",
                amount: 100,
                status: "pending",
                email: "m@example.com",
            },
            {
                id: "728ed52f",
                amount: 100,
                status: "pending",
                email: "mddddddd@example.com",
            },
            // ...
        ]
    }

    try {
       
        const response = await fetch('http://localhost:8080/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Your request body
            })
        });
         
        const responseData = await response.json();
        setData(responseData);
        const noteResponseData  = await getData()
        setNoteData(noteResponseData)
    } catch (error) {
        console.error('Error:', error);
    }
    const paymentData : PaymentData = {
        payment : notedata ?? []
      }
    return (
     <Container paymentData={paymentData}></Container>
    )
}

