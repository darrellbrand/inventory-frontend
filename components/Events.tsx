import React from 'react';
type EventsProps = {
    events: string[];
};
export function Events({ events }: EventsProps) {
    return (
        <div className='text-5xl mb-2 max-w-xl md:max-w-full  dark:bg-slate-800  w-full  h-full flex items-center justify-center mx-auto rounded-2xl '>
            <ul>
                {
                    events.map((event, index) =>
                        <li key={index}>{event}</li>
                    )
                }
            </ul>
        </div>
    );
}