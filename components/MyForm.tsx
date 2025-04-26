import React, { FormEvent, useState } from 'react';
import { socket } from '../socket';
import { Send } from 'lucide-react';
import { useSession } from "next-auth/react"
export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
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

    <form onSubmit={onSubmit} className=' relative flex w-full justify-center'>
      <input placeholder="Enter message" value={value} className='rounded-3xl max-w-xl w-full  p-5  dark:bg-slate-700/30 bg-slate-200/30  placeholder-slate-600 dark:placeholder-slate-300 ' onChange={e => setValue(e.target.value)} />
      <button type="submit" disabled={isLoading} className=''
      >
        <Send className='absolute bottom-4 right-96' size={32}></Send>
      </button>
    </form>

  );
}