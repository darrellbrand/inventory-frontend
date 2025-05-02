import React, { FormEvent, useState } from 'react';
import { socket } from '../socket';
import { Send } from 'lucide-react';
import { useSession } from "next-auth/react"
export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session} = useSession();
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    console.log(`${value}`)
    event.preventDefault();
    setIsLoading(true);
    setValue("")
    socket.timeout(5000).emit('message', {
      userName: session?.user?.name,
      text: value
    }, () => {
      setIsLoading(false);
    });
  }

  return (

    <form onSubmit={onSubmit} className=' relative flex w-full md:max-w-7xl   justify-center items-center pt-4'>
      <input placeholder="Enter message" value={value} className='border p-5 rounded-3xl w-full   dark:bg-slate-700/30 bg-slate-200/30 h-full  placeholder-slate-600 dark:placeholder-slate-300 ' onChange={e => setValue(e.target.value)} />
      <button type="submit" disabled={isLoading} className='  dark:bg-slate-700/30 bg-slate-200/30 p-5 ml-2 rounded-3xl border h-full flex items-center justify-center'
      >
        <Send className='' size={32}></Send>
      </button>
    </form>

  );
}