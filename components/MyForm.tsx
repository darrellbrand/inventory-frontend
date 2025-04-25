import React, { FormEvent, useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    console.log(`${value}`)
    event.preventDefault();
    setIsLoading(true);
    setValue("")
    socket.timeout(5000).emit('message', value, () => {
      setIsLoading(false);
    });
  }

  return (
   
      <form onSubmit={onSubmit} className='flex max-w-xl  w-full flex-col  bg-slate-300 dark:bg-slate-700  rounded-3xl gap-5 p-5'>
        <input placeholder="Enter message"value={value} className='rounded-3xl outline p-5 w-full h-full bg-slate-200 dark:bg-slate-600 placeholder-slate-600 dark:placeholder-slate-300 ' onChange={e => setValue(e.target.value)} />
        <button type="submit" disabled={isLoading} className=' w-full bg-slate-500 dark:bg-slate-500 rounded-3xl p-3  '>Submit</button>
      </form>
    
  );
}