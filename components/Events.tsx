import React, { useState } from 'react';
import { ConnectionState } from '../components/ConnectionState';
import { ConnectionManager } from '../components/ConnectionManager';
type EventsProps = {
    events: { userName: string, text: string }[];
    userList: { username: string }[];
    isConnected: boolean
};

export function Events({ events, isConnected, userList }: EventsProps) {

    return (


        <div className=' relative  text-left  mb-2 max-w-xs md:max-w-full  dark:bg-slate-800  w-full  h-full flex items-center justify-start mx-auto rounded-2xl '>
            <ul className='px-4 w-full'>
                {
                    Array.from(
                        new Map(userList.map(user => [user.username, user])).values()
                    ).map((user, index) => (
                        <li key={index}>{user.username}</li>
                    ))
                }
            </ul>

            <ul className='px-4 w-full'>
                {
                    events.map((event, index) =>
                        <li key={index}>{event.userName} : {event.text}</li>
                    )
                }
            </ul>

            <div className=' absolute top-0 right-0  bg-slate-300 dark:bg-slate-900/30   rounded-xl flex  m-2  px-6 py-4  items-center gap-1 z-10 '>
                <ConnectionState isConnected={isConnected} />
                <ConnectionManager />
            </div>
        </div>
    );
}