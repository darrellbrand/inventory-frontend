import React, { useState } from 'react';

type EventsProps = {
    events: { userName: string, text: string }[];
    userList: { username: string }[];
};

export function Events({ events, userList }: EventsProps) {

    return (


        <div className=' relative text-xl text-left  mb-2  h-[700px]  w-full  flex  rounded-2xl overflow-hidden '>

            <div className=" mx-auto flex  flex-col md:flex-row w-full h-full overflow-y-auto overflow-x-hidden gap-3   items-end">
                <ul className='  text-slate-100 flex-2  px-4 w-1/6  h-full rounded-3xl overflow-x-hidden dark:bg-slate-700/30 bg-slate-200/30 p-14'>
                    <h1 className='text-2xl font-bold dark:text-slate-100 text-slate-800 pb-2'>Connected Users:</h1>
                    {
                        Array.from(
                            new Map(userList.map(user => [user.username, user])).values()
                        ).map((user, index) => (
                            <div className='p-1 flex '>
                                <li className=' dark:text-slate-100 text-slate-800 w-full  max-w-full break-words whitespace-pre-wrap' key={index}>{user.username}</li>
                            </div>
                        ))
                    }
                </ul>

                <ul className='mx-auto  px-4 w-5/6   h-full rounded-3xl overflow-x-hidden  p-14 dark:bg-slate-700/30 bg-slate-200/30 '>
                    <h1 className='font-bold text-2xl dark:text-slate-100 text-slate-800  pb-2'>Messages:</h1>
                    {

                        events.map((event, index) =>
                            <div className=' m-1 p-2 flex '>
                                <li className='   dark:text-slate-100 text-slate-800 w-full  max-w-full break-words whitespace-pre-wrap' key={index}><strong>{event.userName}</strong> ::  {event.text}</li>
                            </div>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}