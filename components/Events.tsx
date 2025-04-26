import React, { useState } from 'react';

type EventsProps = {
    events: { userName: string, text: string }[];
    userList: { username: string }[];
};

export function Events({ events, userList }: EventsProps) {

    return (


        <div className=' relative text-xl text-left  mb-2  h-[700px]  bg-slate-200 dark:bg-slate-600 w-full  flex  rounded-2xl overflow-hidden p-5 '>

            <div className=" mx-auto flex  flex-col md:flex-row w-full h-full overflow-y-auto overflow-x-hidden gap-3   items-end">
                <ul className='  text-slate-100 flex-2  px-4 w-1/6  h-full rounded-3xl overflow-x-hidden bg-background p-14'>
                    <h1 className='text-4xl font-bold dark:text-slate-100 text-slate-800 pb-2'>Connected Users:</h1>
                    {
                        Array.from(
                            new Map(userList.map(user => [user.username, user])).values()
                        ).map((user, index) => (
                            <div className=' dark:bg-slate-600 bg-slate-100 border rounded-xl m-1 p-2 flex '>
                                <li className=' dark:text-slate-100 text-slate-800 w-full  max-w-full break-words whitespace-pre-wrap' key={index}>{user.username}</li>
                            </div>
                        ))
                    }
                </ul>

                <ul className='mx-auto flex- px-4 w-5/6   h-full rounded-3xl overflow-x-hidden bg-background p-14'>
                    <h1 className='font-bold text-4xl dark:text-slate-100 text-slate-800  pb-2 rounded-2xl bg-background'>Messages:</h1>
                    {

                        events.map((event, index) =>
                            <div className=' dark:bg-slate-600 bg-slate-100 border rounded-xl m-1 p-2 flex '>
                                <li className='   dark:text-slate-100 text-slate-800 w-full  max-w-full break-words whitespace-pre-wrap' key={index}><strong>{event.userName}</strong> ::  {event.text}</li>
                            </div>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}