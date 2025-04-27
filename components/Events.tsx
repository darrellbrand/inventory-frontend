import React, { useState } from 'react';

type EventsProps = {
    events: { userName: string, text: string }[];
    userList: { username: string }[];
};

export function Events({ events, userList }: EventsProps) {

    return (


        <div className=' relative text-xl pt-16 md:pt-10 text-left h-full  md:h-[780px]   w-full  flex  rounded-2xl overflow-hidden ' >

            <div className=" mx-auto flex  flex-col md:flex-row w-full h-full overflow-y-auto overflow-x-hidden gap-1   items-end">
                <ul className='border  text-slate-100 flex-2  px-4 w-full  md:w-1/3  h-1/6 md:h-full  dark:bg-slate-700/30 bg-slate-200/30  rounded-3xl overflow-x-hidden p-2  md:p-14'>
                    <h1 className='text-2xl font-bold dark:text-slate-100 text-slate-800 '>Connected Users:</h1>
                    {
                        Array.from(
                            new Map(userList.map(user => [user.username, user])).values()
                        ).map((user, index) => (
                            <div className='p-1 flex '>
                                <li className=' whitespace-nowrap overflow-hidden text-ellipsis dark:text-slate-100 text-slate-800 w-full  max-w-full  ' key={index}>{user.username}</li>
                            </div>
                        ))
                    }
                </ul>

                <ul className='px-4 border w-full h-5/6 md:w-2/3   md:h-full rounded-3xl overflow-x-hidden  dark:bg-slate-700/30 bg-slate-200/30  p-2 md:p-14 '>
                    <h1 className='font-bold text-2xl dark:text-slate-100 text-slate-800  pb-2'>Messages:</h1>
                    {

                        events.map((event, index) =>
                            <div className=' m-1 p-2 flex '>
                                <li className='   dark:text-slate-100 text-slate-800 w-full  max-w-full break-words whitespace-pre-wrap ' key={index}><strong>{event.userName}</strong> ::  {event.text}</li>
                            </div>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}